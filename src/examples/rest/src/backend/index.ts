import 'reflect-metadata';
import Graphweaver from '@exogee/graphweaver-server';
import { AuthorizationContext, localAuthApolloPlugin } from '@exogee/graphweaver-auth';

import { resolvers } from './schema';
// Auth Functions
import { beforeRead, afterRead } from './auth/admin-ui';
import { addUserToContext } from './auth/context';

export enum Roles {
	LIGHT_SIDE = 'LIGHT_SIDE',
	DARK_SIDE = 'DARK_SIDE',
}

const graphweaver = new Graphweaver<AuthorizationContext>({
	resolvers,
	apolloServerOptions: {
		plugins: [localAuthApolloPlugin(addUserToContext)],
	},
	adminMetadata: {
		enabled: true,
		hooks: {
			beforeRead,
			afterRead,
		},
	},
});

export const handler = graphweaver.handler();
