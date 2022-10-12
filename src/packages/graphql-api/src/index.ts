import dotenv from 'dotenv';
import * as path from 'path';
const envPath = process.env.IS_OFFLINE ? path.join(__dirname, '../.env') : undefined;
dotenv.config({
	path: envPath,
});

import 'reflect-metadata';

import { setAdministratorRoleName, upsertAuthorizationContext } from '@exogee/base-resolver';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-lambda';
import { buildSchemaSync } from 'type-graphql';

import { plugins } from './plugins';
import { resolvers } from './schema';
import { formatGraphQLError } from './utils';
// import { handleContext } from './utils/context';

// Setup auth context
setAdministratorRoleName('Administrator');
upsertAuthorizationContext({ roles: ['Administrator'] });

// Build and cache our schema, this can only happen once, hence the need to cache:
// https://github.com/MichalLytek/type-graphql/issues/96
if (!(global as any).schema) {
	(global as any).schema = buildSchemaSync({
		resolvers,
		authChecker: () => true,
	});
}

const pluginsWithPlayground =
	process.env.IS_OFFLINE === 'true'
		? [
				...plugins,
				ApolloServerPluginLandingPageGraphQLPlayground({
					endpoint: '/graphql/v1',
					settings: {
						'request.credentials': 'include',
					},
				}),
		  ]
		: plugins;

const server = new ApolloServer({
	schema: (global as any).schema,
	plugins: pluginsWithPlayground,
	introspection: process.env.IS_OFFLINE === 'true',
	// context: handleContext,
	// This removes implementation details from error messages that shouldn't be exposed to clients.
	formatError: formatGraphQLError,
	// this is hor datasource-rest is used, but we use a later http datasource
	// dataSources: () => {
	// 	return dogAPI: new DogAPI()
	// }
});

exports.handler = server.createHandler({
	// This sets the max payload body size
	expressGetMiddlewareOptions: { bodyParserConfig: { limit: '5mb' } },
});
