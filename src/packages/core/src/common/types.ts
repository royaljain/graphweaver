import { registerEnumType } from 'type-graphql';
import { FieldsByTypeName, ResolveTree } from 'graphql-parse-resolve-info';
import { GraphQLResolveInfo } from 'graphql';

export enum Sort {
	ASC = 'asc',
	DESC = 'desc',
}

export const TypeMap: { [key: string]: any } = {};

registerEnumType(Sort, {
	name: 'Sort',
});

// TODO: When implementing multi-sort columns, Order By has to have its own order so a Record won't do
// (Ordered Array-like is more important than Set-like )
export type OrderByOptions = Record<string, Sort>;

export type PaginationOptions = {
	orderBy: OrderByOptions;
	offset: number;
	limit: number;
};

// Consumers will extend the base context type
export type AuthorizationContext = {
	roles?: string[];
};

export enum AccessType {
	Read = 'Read',
	Create = 'Create',
	Update = 'Update',
	Delete = 'Delete',
}

export const BASE_ROLE_EVERYONE = 'Everyone';

export type AccessControlList<T> = {
	[K in string]?: AccessControlEntry<T>;
};

export interface AccessControlEntry<T> {
	read?: AccessControlValue<T>;
	create?: AccessControlValue<T>;
	update?: AccessControlValue<T>;
	delete?: AccessControlValue<T>;
	write?: AccessControlValue<T>;
	all?: AccessControlValue<T>;
}

export type ConsolidatedAccessControlEntry<T> = {
	[K in AccessType]?: ConsolidatedAccessControlValue<T>;
};

export type AccessControlValue<T> = true | QueryFilterFunction<T>;
export type ConsolidatedAccessControlValue<T> = true | QueryFilterFunction<T>[];
export type QueryFilterFunction<T> = (
	context: AuthorizationContext
) => QueryFilter<T> | Promise<QueryFilter<T>>;

// TODO: (non-trivial) Consider creating a generic filter type for graphql entities
export type QueryFilter<T> = any;

export interface BackendProvider<T> {
	// This is used for query splitting, so we know where to break your
	// queries when you query across data sources.
	readonly backendId: string;

	entityType?: new () => T;

	find(
		filter: any,
		pagination?: PaginationOptions,
		additionalOptionsForBackend?: any
	): Promise<T[]>;
	findOne(filter: any): Promise<T | null>;
	findByRelatedId(
		entity: any,
		relatedField: string,
		relatedIds: readonly string[],
		filter?: any
	): Promise<T[]>;
	updateOne(id: string, updateArgs: Partial<T>): Promise<T>;
	updateMany(entities: (Partial<T> & { id: string })[]): Promise<T[]>;
	createOne(entity: Partial<T>): Promise<T>;
	createMany(entities: Partial<T>[]): Promise<T[]>;
	createOrUpdateMany(entities: Partial<T>[]): Promise<T[]>;
	deleteOne(filter: any): Promise<boolean>;
	getRelatedEntityId(entity: any, relatedIdField: string): string;
	isCollection(entity: any): boolean;

	// Optional, tells dataloader to cap pages at this size.
	readonly maxDataLoaderBatchSize?: number;
}

export interface HookParams<T> {
	args: Record<string, unknown>;
	context: AuthorizationContext;
	info: GraphQLResolveInfo;
	fields: FieldsByTypeName | { [str: string]: ResolveTree } | undefined;
	entities: (T | null)[];
}

export type BeforeReadHook<T> = (
	params: Omit<HookParams<T>, 'entities'>
) => Promise<{ filter: Record<string, unknown> } | undefined>;

export type AfterReadHook<T> = (params: HookParams<T>) => Promise<(T | null)[]>;

export interface GraphqlEntityType<T, O> {
	name: string; // note this is the built-in ES6 class.name attribute
	typeName?: string;
	accessControlList?: AccessControlList<T>;
	fromBackendEntity?(entity: O): T | null;
	mapInputForInsertOrUpdate?(input: any): any;
}

export const GENERIC_AUTH_ERROR_MESSAGE = 'Forbidden';

export enum AdminUIFilterType {
	DATE_RANGE = 'DATE_RANGE',
	ENUM = 'ENUM',
	NUMERIC = 'NUMERIC',
	RELATIONSHIP = 'RELATIONSHIP',
	TEXT = 'TEXT',
}

export type AdminUISettingsType = {
	fields?: {
		[x: string]: {
			filter?: {
				hide: true;
			};
		};
	};
};
