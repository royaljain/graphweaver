import jwt from 'jsonwebtoken';
import ms from 'ms';

import { BaseAuthTokenProvider } from '../token/base-auth-token-provider';
import { AuthToken } from '../schema/token';
import { UserProfile } from '../../user-profile';
import { AuthenticationMethod, JwtPayload } from '../../types';
import { requireEnvironmentVariable } from '../../helper-functions';

const secret = requireEnvironmentVariable('AUTH_JWT_SECRET');
const expiresIn = process.env.AUTH_JWT_EXPIRES_IN ?? '8h';
const mfaExpiresIn = process.env.AUTH_JWT_CHALLENGE_EXPIRES_IN ?? '30m';

/**
 * Removes any prefix from the given authorization header.
 * The prefix is assumed to be separated from the actual token by whitespace.
 * @param authorizationHeader The authorization header string.
 * @returns The modified authorization header with the prefix removed.
 */
const removeAuthPrefixIfPresent = (authorizationHeader: string): string => {
	const prefixPattern = /^\s*[\w-]+\s+/i;
	return authorizationHeader.replace(prefixPattern, '');
};

export const isExpired = (token: string) => {
	const decodedJwt = JSON.parse(atob(token.split('.')[1]));
	return decodedJwt.exp * 1000 < Date.now();
};

const TOKEN_PREFIX = 'Bearer';

export class AuthTokenProvider implements BaseAuthTokenProvider {
	constructor(private authMethod?: AuthenticationMethod) {}

	async generateToken(user: UserProfile) {
		if (!secret) throw new Error('AUTH_JWT_SECRET is required in environment');
		if (!this.authMethod) throw new Error('Please provide an authMethod in the constructor.');
		// @todo Currently, using HMAC SHA256 look to support RSA SHA256
		const authToken = jwt.sign({ id: user.id, amr: [this.authMethod] }, secret, {
			expiresIn,
		});
		const token = new AuthToken(`${TOKEN_PREFIX} ${authToken}`);
		return token;
	}

	async decodeToken(authToken: string): Promise<JwtPayload> {
		if (!secret) throw new Error('AUTH_JWT_SECRET is required in environment');
		const token = removeAuthPrefixIfPresent(authToken);
		const payload = jwt.verify(token, secret);
		if (typeof payload === 'string') throw new Error('Verification of token failed');
		return payload;
	}

	async stepUpToken(existingTokenPayload: JwtPayload) {
		if (!secret) throw new Error('AUTH_JWT_SECRET is required in environment');
		if (!this.authMethod) throw new Error('Please provide an authMethod in the constructor.');
		const expires = Math.floor((Date.now() + ms(mfaExpiresIn)) / 1000);

		const amr = new Set([...(existingTokenPayload.amr ?? []), this.authMethod]);

		const token = jwt.sign(
			{
				...existingTokenPayload,
				amr: [...amr],
				acr: {
					values: {
						...(existingTokenPayload.acr?.values ?? {}),
						[this.authMethod]: expires, // ACR = Authentication Context Class Reference
					},
				},
			},
			secret
		);
		return new AuthToken(`${TOKEN_PREFIX} ${token}`);
	}
}
