import { getAdminUiMetadataResolver } from './metadata-service';
import { AuthChecker, buildSchemaSync } from 'type-graphql';

import path from 'path';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

import { logger } from '@exogee/logger';
import { ApolloServer, BaseContext } from '@apollo/server';
import { ApolloServerOptionsWithStaticSchema } from '@apollo/server/dist/esm/externalTypes/constructor';
import {
	ClearDataLoaderCache,
	LogErrors,
	LogRequests,
	MutexRequestsInDevelopment,
	corsPlugin,
	dedupeGraphQL,
} from './plugins';

import type { CorsPluginOptions } from './plugins';

export * from '@apollo/server';
export { startStandaloneServer } from '@apollo/server/standalone';

export type MetadataHookParams<C> = {
	context: C;
	metadata?: { entities: any; enums: any };
};
export interface AdminMetadata {
	enabled: boolean;
	config?: any;
	hooks?: {
		beforeRead?: <C extends BaseContext>(
			params: MetadataHookParams<C>
		) => Promise<MetadataHookParams<C>>;
		afterRead?: <C extends BaseContext>(
			params: MetadataHookParams<C>
		) => Promise<MetadataHookParams<C>>;
	};
}

export interface GraphweaverConfig {
	adminMetadata?: AdminMetadata;
	resolvers: Array<any>;
	// We omit schema here because we will build it from your resolvers.
	apolloServerOptions?: Omit<ApolloServerOptionsWithStaticSchema<any>, 'schema'>;
	authChecker?: AuthChecker<any, any>;
	corsOptions?: CorsPluginOptions;
	graphqlDeduplicator?: {
		enabled: boolean;
	};
}

export default class Graphweaver<TContext extends BaseContext> {
	server: ApolloServer<TContext>;
	private config: GraphweaverConfig = {
		adminMetadata: { enabled: true },
		resolvers: [],
		apolloServerOptions: {
			introspection: true,
		},
		graphqlDeduplicator: {
			enabled: true,
		},
	};

	constructor(config: GraphweaverConfig) {
		logger.trace(`Graphweaver constructor called`);
		if (!config) {
			throw new Error('Graphweaver config required');
		}
		if (!config.resolvers) {
			throw new Error('Graphweaver resolvers required');
		}
		if (!config.authChecker) {
			logger.warn(
				'Graphweaver authChecker not set, allowing all access from anywhere. Are you sure you want to do this? This should only happen in a non-real environment.'
			);
		}

		// Assign defaults
		this.config = {
			...config,
			adminMetadata: {
				...config.adminMetadata,
				enabled: config.adminMetadata?.enabled ?? true,
			},
			apolloServerOptions: {
				...config.apolloServerOptions,
				introspection: config.apolloServerOptions?.introspection ?? true,
			},
			graphqlDeduplicator: {
				...config.graphqlDeduplicator,
				enabled: config.graphqlDeduplicator?.enabled ?? true,
			},
		};

		// Order is important here
		const plugins = [
			MutexRequestsInDevelopment,
			LogRequests,
			LogErrors,
			ClearDataLoaderCache,
			corsPlugin(this.config.corsOptions),
			...(this.config.apolloServerOptions?.plugins || []),
			...(this.config.graphqlDeduplicator?.enabled ? [dedupeGraphQL] : []),
		];

		const resolvers = (this.config.resolvers || []) as any;

		if (this.config.adminMetadata?.enabled && this.config.resolvers) {
			logger.trace(`Graphweaver adminMetadata is enabled`);
			resolvers.push(getAdminUiMetadataResolver(this.config.adminMetadata?.hooks));
		}
		logger.trace(`Graphweaver buildSchemaSync with ${resolvers.length} resolvers`);

		let schema: any;
		try {
			logger.trace(`Graphweaver loading schema from file`);
			schema = loadSchemaSync(path.join(process.cwd(), './.graphweaver/backend/schema.gql'), {
				loaders: [new GraphQLFileLoader()],
			});
		} catch {
			// continue we can build the schema if the load failed
		}

		if (!schema) {
			logger.trace(
				`Graphweaver building schema from scratch this will slow down the server startup time`
			);
			schema = buildSchemaSync({
				resolvers,
				authChecker: config.authChecker ?? (() => true),
			});
		}

		logger.trace(`Graphweaver starting ApolloServer`);
		this.server = new ApolloServer<TContext>({
			...(this.config.apolloServerOptions as any),
			plugins,
			schema,
		});
	}

	public async init() {
		// Do some async here if necessary
		logger.info(`Graphweaver async called`);
	}
}
