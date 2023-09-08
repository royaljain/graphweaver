process.env.LOCAL_AUTH_REDIRECT_URI = '*';
process.env.LOCAL_AUTH_JWT_SECRET = '*';

import 'reflect-metadata';
import gql from 'graphql-tag';
import Graphweaver, { MetadataHookParams } from '@exogee/graphweaver-server';
import { Resolver } from '@exogee/graphweaver';
import {
	LocalAuthResolver,
	localAuthApolloPlugin,
	UserProfile,
	AuthProvider,
	AuthorizationContext,
	ForbiddenError,
} from '@exogee/graphweaver-auth';

const user = new UserProfile({
	id: '1',
	provider: AuthProvider.LOCAL,
	roles: ['admin'],
	displayName: 'Test User',
});

@Resolver()
export class AuthResolver extends LocalAuthResolver {
	async authenticate(username: string, password: string) {
		return user;
	}
}

export const beforeRead = async <C extends AuthorizationContext>(params: MetadataHookParams<C>) => {
	// Ensure only logged in users can access the admin ui metadata
	if (!params.context.token) throw new ForbiddenError('Forbidden');
	return params;
};

const graphweaver = new Graphweaver({
	resolvers: [AuthResolver],
	apolloServerOptions: {
		plugins: [localAuthApolloPlugin(async () => user)],
	},
	adminMetadata: {
		enabled: true,
		hooks: {
			beforeRead,
		},
	},
});

describe('Local Authentication - Redirect', () => {
	test('should redirect an unauthenticated user to the login screen.', async () => {
		const response = await graphweaver.server.executeOperation({
			query: gql`
				{
					_graphweaver {
						entities {
							name
						}
					}
				}
			`,
		});

		expect(response.http.headers.get('X-Auth-Redirect')).toBe(process.env.LOCAL_AUTH_REDIRECT_URI);
	});
});
