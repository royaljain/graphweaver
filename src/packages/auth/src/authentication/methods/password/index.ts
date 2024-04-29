import {
	BackendProvider,
	BaseDataEntity,
	CreateOrUpdateHookParams,
	GraphQLBoolean,
	GraphQLResolveInfo,
	GraphQLString,
	HookRegister,
	graphweaverMetadata,
	runWritableBeforeHooks,
} from '@exogee/graphweaver';
import { AuthenticationError, ForbiddenError, ValidationError } from 'apollo-server-errors';
import { logger } from '@exogee/logger';
import { Source } from 'graphql';

import { UserProfile } from '../../../user-profile';
import {
	AccessControlList,
	AuthenticationMethod,
	AuthorizationContext,
	RequestParams,
} from '../../../types';
import { Credential, CredentialStorage, Token } from '../../entities';
import {
	PasswordStrengthError,
	defaultPasswordStrength,
	runAfterHooks,
	updatePasswordCredential,
} from '../utils';
import { hashPassword, verifyPassword } from '../../../utils/argon2id';
import { AuthTokenProvider, verifyAndCreateTokenFromAuthToken } from '../../token';
import { AclMap } from '../../../helper-functions';

export enum PasswordOperation {
	LOGIN = 'login',
	REGISTER = 'register',
}

class CreateCredentialInputArgs {
	username!: string;
	password!: string;
	confirm!: string;
}

export class CredentialCreateOrUpdateInputArgs {
	id!: string;
	username?: string;
	password?: string;
	confirm?: string;
}

export type PasswordOptions<D extends CredentialStorage & BaseDataEntity> = {
	provider: BackendProvider<D, Credential<D>>;
	getUserProfile: (
		id: string,
		operation: PasswordOperation,
		params: RequestParams
	) => Promise<UserProfile>;
	acl?: AccessControlList<Credential<D>, AuthorizationContext>;
	assertPasswordStrength?: (password?: string) => boolean;
	onUserAuthenticated?(userId: string, params: RequestParams): Promise<null>;
	onUserRegistered?(userId: string, params: RequestParams): Promise<null>;
};

export class Password<D extends CredentialStorage & BaseDataEntity> {
	private provider: BackendProvider<D, Credential<D>>;
	private getUserProfile: (
		id: string,
		operation: PasswordOperation,
		params: RequestParams
	) => Promise<UserProfile>;
	private assertPasswordStrength: (password?: string) => boolean;
	private onUserAuthenticated?: (userId: string, params: RequestParams) => Promise<null>;
	private onUserRegistered?: (userId: string, params: RequestParams) => Promise<null>;
	private transactional: boolean;

	constructor({
		provider,
		getUserProfile,
		acl,
		assertPasswordStrength,
		onUserAuthenticated,
		onUserRegistered,
	}: PasswordOptions<D>) {
		this.provider = provider;
		this.transactional = !!provider.withTransaction;
		this.getUserProfile = getUserProfile;
		this.assertPasswordStrength = assertPasswordStrength ?? defaultPasswordStrength;
		this.onUserAuthenticated = onUserAuthenticated;
		this.onUserRegistered = onUserRegistered;

		if (acl) {
			// Override the ACL for the Credential entity
			AclMap.set('Credential', acl);
		}

		graphweaverMetadata.addMutation({
			name: 'createCredential',
			getType: () => GraphQLBoolean,
			resolver: this.createCredential as any,
			intentionalOverride: true,
		});

		graphweaverMetadata.addMutation({
			name: 'updateCredential',
			getType: () => GraphQLBoolean,
			resolver: this.updateCredential as any,
			intentionalOverride: true,
		});

		graphweaverMetadata.addMutation({
			name: 'loginPassword',
			getType: () => Token,
			args: {
				username: { type: GraphQLString },
				password: { type: GraphQLString },
			},
			resolver: (
				_: Source,
				args: { username: string; password: string },
				ctx: AuthorizationContext,
				info: GraphQLResolveInfo
			) => this.loginPassword(args.username, args.password, ctx, info),
		});

		graphweaverMetadata.addMutation({
			name: 'challengePassword',
			getType: () => GraphQLBoolean,
			resolver: this.challengePassword as any,
		});
	}

	public async withTransaction<T>(callback: () => Promise<T>) {
		return this.provider.withTransaction ? this.provider.withTransaction<T>(callback) : callback();
	}

	async authenticate(
		username: string,
		password: string,
		params: RequestParams
	): Promise<UserProfile> {
		const credential = await this.provider.findOne({
			username,
		});

		if (!credential) throw new AuthenticationError('Bad Request: Authentication Failed. (E0001)');
		if (!credential.password)
			throw new AuthenticationError('Bad Request: Authentication Failed. (E0002)');

		if (await verifyPassword(password, credential.password)) {
			return this.getUserProfile(credential.id, PasswordOperation.LOGIN, params);
		}

		this.onUserAuthenticated?.(credential.id, params);

		throw new AuthenticationError('Bad Request: Authentication Failed. (E0003)');
	}

	async create(
		params: CreateOrUpdateHookParams<CredentialCreateOrUpdateInputArgs>
	): Promise<UserProfile> {
		const [item] = params.args.items;
		if (!item) throw new Error('No data specified cannot continue.');

		if (!item.username) throw new ValidationError('Create unsuccessful: Username not defined.');

		if (!item.password) throw new ValidationError('Create unsuccessful: Password not defined.');

		this.assertPasswordStrength(item.password);

		if (item.password !== item.confirm)
			throw new ValidationError('Create unsuccessful: Passwords do not match.');

		const passwordHash = await hashPassword(item.password);
		const credential = await this.provider.createOne({
			username: item.username,
			password: passwordHash,
		} as Credential<D> & { password: string });

		const [entity] = await runAfterHooks(HookRegister.AFTER_CREATE, [credential], params);
		if (!entity) throw new AuthenticationError('Bad Request: Authentication Save Failed.');
		this.onUserRegistered?.(entity.id, { info: params.info, ctx: params.context });

		return this.getUserProfile(entity.id, PasswordOperation.REGISTER, {
			info: params.info,
			ctx: params.context,
		});
	}

	async update(
		params: CreateOrUpdateHookParams<CredentialCreateOrUpdateInputArgs>
	): Promise<UserProfile> {
		const [item] = params.args.items;
		if (!item.id) throw new ValidationError('Update unsuccessful: No ID sent in request.');

		if (item.password && item.password !== item.confirm)
			throw new ValidationError('Update unsuccessful: Passwords do not match.');

		if (!item.username && !item.password)
			throw new ValidationError('Update unsuccessful: Nothing to update.');

		const entity = await updatePasswordCredential({
			assertPasswordStrength: this.assertPasswordStrength,
			provider: this.provider,
			id: item.id,
			password: item.password,
			username: item.username,
			params,
		});

		return this.getUserProfile(entity.id, PasswordOperation.REGISTER, {
			info: params.info,
			ctx: params.context,
		});
	}

	// The below methods are exposed as mutations via GraphQL

	async createCredential(
		data: CreateCredentialInputArgs,
		context: AuthorizationContext,
		info: GraphQLResolveInfo
	): Promise<Credential<D> | null> {
		return this.withTransaction<Credential<D> | null>(async () => {
			const params = {
				args: { items: [data] },
				info,
				context,
				transactional: this.transactional,
			};

			let userProfile;
			try {
				const hookParams = await runWritableBeforeHooks<CredentialCreateOrUpdateInputArgs>(
					HookRegister.BEFORE_CREATE,
					params,
					'Credential'
				);

				userProfile = await this.create(hookParams);
			} catch (err) {
				logger.error(err);

				if (err instanceof PasswordStrengthError) throw err;
				if (err instanceof ValidationError) throw err;
				if (err instanceof ForbiddenError)
					throw new ForbiddenError(
						'Permission Denied: You do not have permission to create credentials.'
					);

				throw new AuthenticationError(
					'Create unsuccessful: You do not have permission to perform this action.'
				);
			}

			if (!userProfile)
				throw new AuthenticationError('Create unsuccessful: Failed to get user profile.');
			if (!userProfile.id) throw new AuthenticationError('Create unsuccessful: ID missing.');
			if (!userProfile.username)
				throw new AuthenticationError('Create unsuccessful: Username missing.');

			return Credential.fromBackendEntity({
				id: userProfile.id,
				username: userProfile.username,
			} as { id: string; username: string } & BaseDataEntity) as Credential<D> | null;
		});
	}

	async updateCredential(
		data: CredentialCreateOrUpdateInputArgs,
		context: AuthorizationContext,
		info: GraphQLResolveInfo
	): Promise<Credential<D> | null> {
		return this.withTransaction<Credential<D> | null>(async () => {
			const params = {
				args: { items: [data] },
				info,
				context,
				transactional: this.transactional,
			};

			let userProfile;
			try {
				const hookParams = await runWritableBeforeHooks<CredentialCreateOrUpdateInputArgs>(
					HookRegister.BEFORE_UPDATE,
					params,
					'Credential'
				);
				userProfile = await this.update(hookParams);
			} catch (err) {
				logger.error(err);
				if (err instanceof PasswordStrengthError) throw err;
				if (err instanceof ValidationError) throw err;
				if (err instanceof ForbiddenError)
					throw new ForbiddenError(
						'Permission Denied: You do not have permission to update credentials.'
					);
				throw new AuthenticationError(
					`Update unsuccessful: You do not have permission to perform this action.`
				);
			}

			if (!userProfile)
				throw new ValidationError('Update unsuccessful: Failed to get user profile.');
			if (!userProfile.id) throw new ValidationError('Update unsuccessful: ID missing.');
			if (!userProfile.username)
				throw new ValidationError('Update unsuccessful: Username missing.');

			return Credential.fromBackendEntity({
				id: userProfile.id,
				username: userProfile.username,
			} as { id: string; username: string } & BaseDataEntity) as Credential<D> | null;
		});
	}

	async loginPassword(
		username: string,
		password: string,
		ctx: AuthorizationContext,
		info: GraphQLResolveInfo
	): Promise<Token> {
		const tokenProvider = new AuthTokenProvider(AuthenticationMethod.PASSWORD);
		const userProfile = await this.authenticate(username, password, { ctx, info });
		if (!userProfile) throw new AuthenticationError('Login unsuccessful: Authentication failed.');

		const authToken = await tokenProvider.generateToken(userProfile);
		return verifyAndCreateTokenFromAuthToken(authToken);
	}

	async challengePassword(
		password: string,
		ctx: AuthorizationContext,
		info: GraphQLResolveInfo
	): Promise<Token> {
		if (!ctx.token) throw new AuthenticationError('Challenge unsuccessful: Token missing.');
		const tokenProvider = new AuthTokenProvider(AuthenticationMethod.PASSWORD);
		const existingToken =
			typeof ctx.token === 'string' ? await tokenProvider.decodeToken(ctx.token) : ctx.token;

		const username = ctx.user?.username;
		if (!username) throw new AuthenticationError('Challenge unsuccessful: Username missing.');

		const userProfile = await this.authenticate(username, password, { ctx, info });
		if (!userProfile) throw new AuthenticationError('Challenge unsuccessful: Userprofile missing.');

		const authToken = await tokenProvider.stepUpToken(existingToken);
		return verifyAndCreateTokenFromAuthToken(authToken);
	}
}
