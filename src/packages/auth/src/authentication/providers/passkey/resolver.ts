import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import {
	generateRegistrationOptions,
	verifyRegistrationResponse,
	generateAuthenticationOptions,
	verifyAuthenticationResponse,
} from '@simplewebauthn/server';
import { AuthenticationError } from 'apollo-server-errors';
import { GraphQLJSON } from '@exogee/graphweaver-scalars';
import type {
	PublicKeyCredentialCreationOptionsJSON,
	PublicKeyCredentialRequestOptionsJSON,
	AuthenticatorDevice,
} from '@simplewebauthn/typescript-types';

import { AuthorizationContext } from '../../../types';
import { Token } from '../../schema/token';
import { PasskeyRegistrationResponse, PasskeyAuthenticationResponse } from './entities';

export type {
	AuthenticatorDevice as PasskeyAuthenticatorDevice,
	AuthenticatorTransportFuture as PasskeyAuthenticatorTransportFuture,
} from '@simplewebauthn/typescript-types';

// Human-readable title for your website
const rpName = 'SimpleWebAuthn Example';
// A unique identifier for your website
const rpID = 'localhost';
// The URL at which registrations and authentications should occur
const origin = `https://${rpID}`;

@Resolver((of) => Token)
export abstract class PasskeyAuthResolver {
	abstract getUserCurrentChallenge(userId: string): Promise<string>;
	abstract setUserCurrentChallenge(userId: string, challenge: string): Promise<boolean>;
	abstract getUserAuthenticators(userId: string): Promise<AuthenticatorDevice[]>;
	abstract getUserAuthenticator(
		userId: string,
		authenticatorId: string
	): Promise<AuthenticatorDevice>;
	abstract saveNewUserAuthenticator(
		userId: string,
		authenticator: AuthenticatorDevice
	): Promise<boolean>;
	abstract saveUpdatedAuthenticatorCounter(
		authenticator: AuthenticatorDevice,
		counter: number
	): Promise<boolean>;

	@Mutation(() => GraphQLJSON)
	async passkeyGenerateRegistrationOptions(
		@Ctx() ctx: AuthorizationContext
	): Promise<PublicKeyCredentialCreationOptionsJSON> {
		const userId = ctx.user?.id;
		if (!userId) throw new AuthenticationError('Authentication failed.');

		const username = ctx.user?.username;
		if (!username) throw new AuthenticationError('Authentication failed.');

		const userAuthenticators = await this.getUserAuthenticators(userId);

		const options = await generateRegistrationOptions({
			rpName,
			rpID,
			userID: userId,
			userName: username,
			attestationType: 'none',
			excludeCredentials: userAuthenticators.map((authenticator) => ({
				id: authenticator.credentialID,
				type: 'public-key',
				transports: authenticator.transports,
			})),
		});

		await this.setUserCurrentChallenge(userId, options.challenge);

		return options;
	}

	@Mutation(() => Boolean)
	async passkeyVerifyRegistrationResponse(
		@Arg('registrationResponse', () => PasskeyRegistrationResponse)
		registrationResponse: PasskeyRegistrationResponse,
		@Ctx() ctx: AuthorizationContext
	): Promise<boolean> {
		const userId = ctx.user?.id;
		if (!userId) throw new AuthenticationError('Authentication failed.');

		const expectedChallenge = await this.getUserCurrentChallenge(userId);

		let verification;
		try {
			verification = await verifyRegistrationResponse({
				response: registrationResponse,
				expectedChallenge,
				expectedOrigin: origin,
				expectedRPID: rpID,
			});
		} catch (error: any) {
			throw new AuthenticationError(`Authentication failed: ${error?.message ?? ''}`);
		}

		const { verified, registrationInfo } = verification;

		if (verified) {
			if (!registrationInfo?.credentialPublicKey) throw new AuthenticationError('');
			if (!registrationInfo?.counter) throw new AuthenticationError('');

			const newAuthenticator: AuthenticatorDevice = {
				credentialID: registrationInfo.credentialID,
				credentialPublicKey: registrationInfo.credentialPublicKey,
				counter: registrationInfo.counter,
			};

			await this.saveNewUserAuthenticator(userId, newAuthenticator);
		}

		return verified;
	}

	@Mutation(() => GraphQLJSON)
	async passkeyGenerateAuthenticationOptions(
		@Ctx() ctx: AuthorizationContext
	): Promise<PublicKeyCredentialRequestOptionsJSON> {
		const userId = ctx.user?.id;
		if (!userId) throw new AuthenticationError('Authentication failed.');

		const userAuthenticators = await this.getUserAuthenticators(userId);

		const options = await generateAuthenticationOptions({
			// Require users to use a previously-registered authenticator
			allowCredentials: userAuthenticators.map((authenticator) => ({
				id: authenticator.credentialID,
				type: 'public-key',
				transports: authenticator.transports,
			})),
			userVerification: 'preferred',
		});

		// (Pseudocode) Remember this challenge for this user
		await this.setUserCurrentChallenge(userId, options.challenge);

		return options;
	}

	@Mutation(() => Boolean)
	async passkeyVerifyAuthenticationResponse(
		@Arg('authenticationResponse', () => PasskeyAuthenticationResponse)
		authenticationResponse: PasskeyAuthenticationResponse,
		@Ctx() ctx: AuthorizationContext
	): Promise<boolean> {
		const userId = ctx.user?.id;
		if (!userId) throw new AuthenticationError('Authentication failed.');

		const expectedChallenge = await this.getUserCurrentChallenge(userId);
		const authenticator = await this.getUserAuthenticator(userId, authenticationResponse.id);

		if (!authenticator) {
			throw new AuthenticationError(
				`Could not find authenticator ${authenticationResponse.id} for user ${userId}`
			);
		}

		let verification;
		try {
			verification = await verifyAuthenticationResponse({
				response: authenticationResponse,
				expectedChallenge,
				expectedOrigin: origin,
				expectedRPID: rpID,
				authenticator,
			});
		} catch (error: any) {
			throw new AuthenticationError(`Authentication failed: ${error?.message ?? ''}`);
		}

		const { verified } = verification;

		if (verified) {
			const { authenticationInfo } = verification;
			const { newCounter } = authenticationInfo;

			await this.saveUpdatedAuthenticatorCounter(authenticator, newCounter);
		}

		return verified;
	}
}
