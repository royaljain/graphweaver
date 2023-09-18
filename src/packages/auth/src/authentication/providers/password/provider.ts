import jwt from 'jsonwebtoken';
import ms from 'ms';

import { BaseAuthTokenProvider } from '../../base-auth-token-provider';
import { AuthToken } from '../../schema/token';
import { UserProfile } from '../../../user-profile';
import { AuthenticationMethod } from '../../../types';

const secret = process.env.PASSWORD_AUTH_JWT_SECRET;
const expiresIn = process.env.PASSWORD_AUTH_JWT_EXPIRES_IN ?? '8h';

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

const TOKEN_PREFIX = 'Bearer';

export class PasswordAuthTokenProvider implements BaseAuthTokenProvider {
	async generateToken(user: UserProfile) {
		if (!secret) throw new Error('PASSWORD_AUTH_JWT_SECRET is required in environment');
		// @todo Currently, using HMAC SHA256 look to support RSA SHA256
		const authToken = jwt.sign({ id: user.id, amr: [AuthenticationMethod.PASSWORD] }, secret, {
			expiresIn,
		});
		const token = new AuthToken(`${TOKEN_PREFIX} ${authToken}`);
		return token;
	}
	async decodeToken(authToken: string) {
		if (!secret) throw new Error('PASSWORD_AUTH_JWT_SECRET is required in environment');
		const token = removeAuthPrefixIfPresent(authToken);
		const payload = jwt.verify(token, secret);
		if (typeof payload === 'string') throw new Error('Verification of token failed');
		return payload;
	}
	async stepUpToken(user: UserProfile) {
		if (!secret) throw new Error('PASSWORD_AUTH_JWT_SECRET is required in environment');

		const authToken = jwt.sign(
			{
				id: user.id,
				amr: [AuthenticationMethod.PASSWORD], // AMR = Authentication Method Reference https://datatracker.ietf.org/doc/html/rfc8176
				acr: {
					values: {
						// @todo spread in any existing valid acr values from the current token
						[`${AuthenticationMethod.PASSWORD}`]: ms(expiresIn), // ACR = Authentication Context Class Reference
					},
				},
			},
			secret,
			{
				expiresIn,
			}
		);
		const token = new AuthToken(`${TOKEN_PREFIX} ${authToken}`);

		return token;
	}
}
