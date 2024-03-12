process.env.PASSWORD_AUTH_REDIRECT_URI = '*';

import 'reflect-metadata';
import gql from 'graphql-tag';
import assert from 'assert';

import Graphweaver from '@exogee/graphweaver-server';
import { Resolver } from '@exogee/graphweaver';
import {
	authApolloPlugin,
	UserProfile,
	ForgottenPasswordLinkData,
	createForgottenPasswordAuthResolver,
	AuthenticationBaseEntity,
	AccessControlList,
	AuthorizationContext,
	createAuthenticationEntity,
	Credential,
	createPasswordAuthResolver,
	CredentialStorage,
} from '@exogee/graphweaver-auth';
import { BaseEntity, ConnectionManager, MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { Entity, PrimaryKey, BigIntType, Property, JsonType } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';

@Entity()
export class OrmAuthentication<T> extends BaseEntity implements AuthenticationBaseEntity<T> {
	@PrimaryKey({ type: new BigIntType('string') })
	id!: string;

	@Property({ type: String })
	type!: string;

	@Property({ type: new BigIntType('string') })
	userId!: string;

	@Property({ type: JsonType })
	data!: T;

	@Property({ type: Date })
	createdAt!: Date;
}

@Entity()
class OrmCredential extends BaseEntity implements CredentialStorage {
	@PrimaryKey({ type: new BigIntType('string') })
	id!: string;

	@Property({ type: String })
	username!: string;

	@Property({ type: String })
	password!: string;
}

let token = '';

const user = new UserProfile({
	id: '1',
	roles: ['admin'],
	displayName: 'Test User',
});

// Create Data Provider
const connection = {
	connectionManagerId: 'InMemory',
	mikroOrmConfig: {
		entities: [OrmCredential, OrmAuthentication],
		dbName: ':memory:',
		driver: SqliteDriver,
	},
};

const acl: AccessControlList<OrmAuthentication<ForgottenPasswordLinkData>, AuthorizationContext> = {
	LIGHT_SIDE: {
		// Users can only perform read operations on their own Authentications
		read: (context) => ({ id: context.user?.id }),
	},
	DARK_SIDE: {
		// Dark side user role can perform operations on any Authentications
		all: true,
	},
};

export const ForgottenPasswordLink =
	createAuthenticationEntity<OrmAuthentication<ForgottenPasswordLinkData>>(acl);

@Resolver()
export class ForgottenPasswordLinkResolver extends createForgottenPasswordAuthResolver<
	OrmAuthentication<ForgottenPasswordLinkData>
>(
	ForgottenPasswordLink,
	new MikroBackendProvider(OrmAuthentication<ForgottenPasswordLinkData>, connection)
) {
	async sendForgottenPasswordLink(url: URL): Promise<boolean> {
		token = url.searchParams.get('token') ?? '';
		return true;
	}

	async getUser(username: string): Promise<UserProfile> {
		return user;
	}
}

@Resolver()
export class PasswordAuthResolver extends createPasswordAuthResolver<OrmCredential>(
	Credential,
	new MikroBackendProvider(OrmCredential, connection)
) {}

const graphweaver = new Graphweaver({
	resolvers: [ForgottenPasswordLinkResolver, PasswordAuthResolver],
	apolloServerOptions: {
		plugins: [authApolloPlugin(async () => user, { implicitAllow: true })],
	},
});

describe('Forgotten Password flow', () => {
	beforeAll(async () => {
		await ConnectionManager.connect('InMemory', connection);
		const database = ConnectionManager.database('InMemory');
		await database?.orm.schema.createSchema();

		const credential = new OrmCredential();
		credential.username = 'test';
		credential.password = 'forgotPassword';
		database?.em.persistAndFlush(credential);
	});

	test('should generate a forgotten password link and allow resetting', async () => {
		const response = await graphweaver.server.executeOperation<{
			sendResetPasswordLink: boolean;
		}>({
			query: gql`
				mutation generateForgottenPasswordLink($username: String!) {
					sendResetPasswordLink(username: $username)
				}
			`,
			variables: {
				username: 'test',
			},
		});

		assert(response.body.kind === 'single');
		expect(response.body.singleResult.errors).toBeUndefined();
		expect(response.body.singleResult.data?.sendResetPasswordLink).toBe(true);

		const resetPasswordResponse = await graphweaver.server.executeOperation<{
			resetPassword: boolean;
		}>({
			query: gql`
				mutation resetPassword($token: String!, $password: String!) {
					resetPassword(token: $token, password: $password)
				}
			`,
			variables: {
				token,
				password: 'newPassword',
			},
		});

		assert(resetPasswordResponse.body.kind === 'single');
		expect(resetPasswordResponse.body.singleResult.errors).toBeUndefined();
		expect(resetPasswordResponse.body.singleResult.data?.resetPassword).toBe(true);
	});
});
