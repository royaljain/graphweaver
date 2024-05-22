import { GraphQLResolveInfo, isListType, isObjectType } from 'graphql';
import { logger } from '@exogee/logger';
import { BaseContext, GraphQLArgs } from './types';
import {
	BaseDataEntity,
	BaseLoaders,
	CreateOrUpdateHookParams,
	DeleteHookParams,
	DeleteManyHookParams,
	EntityMetadata,
	Filter,
	GraphQLEntityConstructor,
	HookRegister,
	ReadHookParams,
	WithId,
	createOrUpdateEntities,
	getFieldTypeFromFieldMetadata,
	graphweaverMetadata,
	hookManagerMap,
} from '.';
import { QueryManager } from './query-manager';
import { applyDefaultValues, hasId, withTransaction } from './utils';

export const getOne = async <G, C extends BaseContext>(
	source: unknown,
	{ id }: { id: string },
	context: C,
	info: GraphQLResolveInfo
) => {
	logger.trace({ id, context, info }, 'Get One resolver called.');

	if (!isObjectType(info.returnType)) {
		throw new Error('Graphweaver getOne resolver can only be used to return single objects.');
	}

	const { name } = info.returnType;
	const entity = graphweaverMetadata.getEntityByName(name);

	if (!entity) {
		throw new Error(`Entity ${name} not found in metadata.`);
	}

	if (!entity.provider) {
		throw new Error(`Entity ${name} does not have a provider, cannot resolve.`);
	}

	const hookManager = hookManagerMap.get(entity.name);

	const params: ReadHookParams<G> = {
		args: { filter: { id } as Filter<G> },
		info,
		context,
		transactional: !!entity.provider.withTransaction,
	};

	const hookParams = hookManager
		? await hookManager.runHooks(HookRegister.BEFORE_READ, params)
		: params;

	if (!hookParams.args?.filter) throw new Error('No find filter specified cannot continue.');

	let result = await entity.provider.findOne(hookParams.args.filter);
	const gqlEntityType = entity.target as any;

	// If there's a fromBackendEntity function on the entity, go ahead and run it.
	if (result && gqlEntityType.fromBackendEntity) {
		result = gqlEntityType.fromBackendEntity.call(gqlEntityType, result);
	}

	// If a hook manager is installed, run the after read hooks for this operation.
	if (hookManager) {
		const { entities } = await hookManager.runHooks(HookRegister.AFTER_READ, {
			...hookParams,
			entities: [result],
		});
		result = entities[0];
	}

	// And finally return whatever we have at this point.
	return result;
};

export const list = async <G, D extends BaseDataEntity, C extends BaseContext>(
	source: unknown,
	{ filter, pagination }: Omit<GraphQLArgs<G>, 'items'>,
	context: C,
	info: GraphQLResolveInfo
) => {
	logger.trace({ filter, pagination, context, info }, 'List resolver called.');

	if (!isListType(info.returnType)) {
		throw new Error('Graphweaver list resolver can only be used to return list types.');
	}

	if (!isObjectType(info.returnType.ofType)) {
		throw new Error('Graphweaver list resolver can only be used to return lists of objects.');
	}

	const { name } = info.returnType.ofType;
	const entity = graphweaverMetadata.getEntityByName(name);

	if (!entity) {
		throw new Error(`Entity ${name} not found in metadata.`);
	}

	if (!entity.provider) {
		throw new Error(`Entity ${name} does not have a provider, cannot resolve list operation.`);
	}

	const hookManager = hookManagerMap.get(entity.name);
	const params: ReadHookParams<G> = {
		args: { filter, pagination },
		info,
		context,
		transactional: !!entity.provider.withTransaction,
	};
	const hookParams = hookManager
		? await hookManager.runHooks(HookRegister.BEFORE_READ, params)
		: params;

	let result = await QueryManager.find<D, G>({
		entityName: entity.name,
		filter: hookParams.args?.filter,
		pagination: hookParams.args?.pagination,
	});
	logger.trace({ result }, 'Got result');

	// If there's a fromBackendEntity function on the entity, go ahead and run it.
	const gqlEntityType = entity.target as any;
	if (gqlEntityType.fromBackendEntity) {
		logger.trace(
			{ entityName: gqlEntityType.name },
			'Entity implements fromBackendEntity, converting'
		);

		result = result.map((entity) => gqlEntityType.fromBackendEntity.call(gqlEntityType, entity));

		logger.trace({ result }, 'Converted entities');
	}

	// If a hook manager is installed, run the after read hooks for this operation.
	if (hookManager) {
		const { entities } = await hookManager.runHooks(HookRegister.AFTER_READ, {
			...hookParams,
			entities: result,
		});
		result = entities;
	}

	// And finally return whatever we have at this point.
	return result;
};

export const createOrUpdate = async <G extends WithId & { name: string }, C extends BaseContext>(
	_source: unknown,
	{ input }: { input: Partial<G> | Partial<G>[] },
	context: C,
	info: GraphQLResolveInfo
) => {
	logger.trace({ input, context, info }, 'Create or Update resolver called.');

	let name;

	if (isObjectType(info.returnType)) {
		name = info.returnType.name;
	} else if (isListType(info.returnType) && isObjectType(info.returnType.ofType)) {
		name = info.returnType.ofType.name;
	} else {
		throw new Error('Could not determine entity name from return type.');
	}

	const entity = graphweaverMetadata.getEntityByName<G, BaseDataEntity>(name);

	if (!entity) {
		throw new Error(`Entity ${name} not found in metadata.`);
	}

	if (!entity.provider) {
		throw new Error(
			`Entity ${name} does not have a provider, cannot resolve create or update operation.`
		);
	}

	// Ok, now let's apply our default values to the data.
	applyDefaultValues(input, entity);

	const inputArray = Array.isArray(input) ? input : [input];

	return withTransaction(entity.provider, async () => {
		// Extracted common properties
		const hookManager = hookManagerMap.get(entity.name);
		const commonParams: Omit<CreateOrUpdateHookParams<G>, 'args'> = {
			info,
			context,
			transactional: !!entity.provider?.withTransaction,
		};

		// Separate Create and Update items
		const updateItems = [];
		const createItems = [];
		for (const item of inputArray) {
			if (hasId(item)) {
				updateItems.push(item);
			} else {
				createItems.push(item);
			}
		}

		// Extract ids of items being updated
		const updateItemIds = updateItems.map((item) => item.id) ?? [];

		// Prepare updateParams and run hook if needed
		const updateParams: CreateOrUpdateHookParams<G> = {
			args: { items: updateItems },
			...commonParams,
		};
		const updateHookParams =
			updateItems.length && hookManager
				? await hookManager.runHooks(HookRegister.BEFORE_UPDATE, updateParams)
				: updateParams;

		// Prepare createParams and run hook if needed
		const createParams: CreateOrUpdateHookParams<G> = {
			args: { items: createItems },
			...commonParams,
		};
		const createHookParams =
			createItems.length && hookManager
				? await hookManager.runHooks(HookRegister.BEFORE_CREATE, createParams)
				: createParams;

		// Combine update and create items into a single array
		const data = [...(updateHookParams.args?.items ?? []), ...(createHookParams.args?.items ?? [])];

		const entities = (await createOrUpdateEntities(data, entity, info, context)) as G[];

		// Filter update and create entities
		let updatedEntities = entities.filter((entity) => entity && updateItemIds.includes(entity.id));
		let createdEntities = entities.filter((entity) => entity && !updateItemIds.includes(entity.id));

		// Run after hooks for update and create entities
		if (hookManager) {
			createdEntities = (
				await hookManager.runHooks(HookRegister.AFTER_CREATE, {
					...createHookParams,
					entities: createdEntities,
				})
			).entities;

			updatedEntities = (
				await hookManager.runHooks(HookRegister.AFTER_UPDATE, {
					...updateHookParams,
					entities: updatedEntities,
				})
			).entities;
		}

		// Return combined results if it's a multi update, otherwise just one.
		if (isListType(info.returnType)) return [...createdEntities, ...updatedEntities];
		else return createdEntities[0] ?? updatedEntities[0];
	});
};

// This is a function generator where you can bind it to the correct entity when creating it, as we cannot look up the entity name / type from the info object.
export const deleteOne =
	(entity: EntityMetadata<any, any>) =>
	async <G extends WithId & { name: string }, C extends BaseContext>(
		source: unknown,
		{ filter }: { filter: Filter<G> },
		context: C,
		info: GraphQLResolveInfo
	) => {
		if (!entity.provider) {
			throw new Error(
				`Entity ${entity.name} does not have a provider, cannot resolve delete operation.`
			);
		}

		const hookManager = hookManagerMap.get(entity.name);
		const params: DeleteHookParams<G> = {
			args: { filter },
			info,
			context,
			transactional: false,
		};

		const hookParams = hookManager
			? await hookManager.runHooks(HookRegister.BEFORE_DELETE, params)
			: params;

		if (!hookParams.args?.filter) throw new Error('No delete filter specified cannot continue.');

		const success = await entity.provider.deleteOne(hookParams.args.filter);

		hookManager &&
			(await hookManager.runHooks(HookRegister.AFTER_DELETE, {
				...hookParams,
				deleted: success,
			}));

		return success;
	};

export const deleteMany =
	(entity: EntityMetadata<any, any>) =>
	async <G extends WithId & { name: string }, C extends BaseContext>(
		_source: unknown,
		{ filter }: { filter: Filter<G> },
		context: C,
		info: GraphQLResolveInfo
	) => {
		if (!entity.provider) {
			throw new Error(
				`Entity ${entity.name} does not have a provider, cannot resolve delete operation.`
			);
		}
		return withTransaction(entity.provider, async () => {
			if (!entity.provider?.deleteMany) throw new Error('Provider has not implemented DeleteMany.');

			const hookManager = hookManagerMap.get(entity.name);
			const params: DeleteManyHookParams<G> = {
				args: { filter },
				info,
				context,
				transactional: !!entity.provider.withTransaction,
			};

			const hookParams = hookManager
				? await hookManager.runHooks(HookRegister.BEFORE_DELETE, params)
				: params;

			if (!hookParams.args?.filter) throw new Error('No delete ids specified cannot continue.');

			const success = await entity.provider.deleteMany(hookParams.args?.filter);

			hookManager &&
				(await hookManager.runHooks(HookRegister.AFTER_DELETE, {
					...hookParams,
					deleted: success,
				}));

			return success;
		});
	};

export const listRelationshipField = async <
	G extends WithId & { name: string } & { dataEntity: D },
	D extends BaseDataEntity,
	C extends BaseContext,
>(
	source: G,
	input: { filter: Filter<G> },
	context: C,
	info: GraphQLResolveInfo
) => {
	logger.trace(`Resolving ${info.parentType.name}.${info.fieldName}`);

	if (!info.path.typename)
		throw new Error(`No typename found in path for ${info.path}, this should not happen.`);

	const entity = graphweaverMetadata.getEntityByName(info.path.typename);
	if (!entity) {
		throw new Error(`Entity ${source.name} not found in metadata. This should not happen.`);
	}

	// If we've already resolved the data, we may want to return it, but we want the hooks to run first.
	const existingData = source[info.fieldName as keyof typeof source];

	const field = entity.fields[info.fieldName];
	const { id, relatedField } = field.relationshipInfo ?? {};
	const idValue = !id
		? undefined
		: typeof id === 'function'
			? id(source.dataEntity)
			: (source.dataEntity as any)[id];

	if (typeof existingData === 'undefined' && !idValue && !field.relationshipInfo?.relatedField) {
		// id is null and we are loading a single instance so let's return null
		return null;
	}

	const { fieldType, isList } = getFieldTypeFromFieldMetadata(field);
	const gqlEntityType = fieldType as GraphQLEntityConstructor<G, D>;

	// We need to construct a filter for the related entity and _and it with the user supplied filter.
	const _and: Filter<G>[] = [];

	// If we have a user supplied filter, add it to the _and array.
	if (input.filter) _and.push(input.filter);

	// Lets check the relationship type and add the appropriate filter.
	if (idValue) _and.push({ id: idValue });
	else if (relatedField) _and.push({ [relatedField]: { id: source.id } } as Filter<G>);

	const relatedEntityFilter = { _and } as Filter<G>;

	const params: ReadHookParams<G> = {
		args: { filter: relatedEntityFilter },
		info,
		context,
		transactional: !!entity.provider?.withTransaction,
	};
	const hookManager = hookManagerMap.get(gqlEntityType.name);
	const hookParams = hookManager
		? await hookManager.runHooks(HookRegister.BEFORE_READ, params)
		: params;

	// Ok, now we've run our hooks and validated permissions, let's first check if we already have the data.
	logger.trace('Checking for existing data.');

	if (typeof existingData !== 'undefined') {
		logger.trace({ existingData }, 'Existing data found, returning.');

		const entities = [existingData].flat();

		logger.trace('Running after read hooks');
		const { entities: hookEntities = [] } = hookManager
			? await hookManager.runHooks(HookRegister.AFTER_READ, {
					...hookParams,
					entities,
				})
			: { entities };

		logger.trace({ before: existingData, after: hookEntities }, 'After read hooks ran');

		return isList ? hookEntities : hookEntities[0];
	}

	logger.trace('Existing data not found. Loading from BaseLoaders');

	let dataEntities: D[] | undefined = undefined;
	if (field.relationshipInfo?.relatedField) {
		logger.trace('Loading with loadByRelatedId');

		dataEntities = await BaseLoaders.loadByRelatedId({
			gqlEntityType,
			relatedField: field.relationshipInfo.relatedField,
			id: String(source.id),
			filter: relatedEntityFilter,
		});
	} else if (idValue) {
		logger.trace('Loading with loadOne');

		const dataEntity = await BaseLoaders.loadOne({
			gqlEntityType,
			id: idValue,
		});
		dataEntities = [dataEntity];
	}

	let entities = dataEntities;
	if ('fromBackendEntity' in gqlEntityType) {
		logger.trace('Running fromBackendEntity on result');

		entities = dataEntities?.map((dataEntity) =>
			(gqlEntityType as any).fromBackendEntity(dataEntity)
		);
	}

	logger.trace('Running after read hooks');
	const { entities: hookEntities = [] } = hookManager
		? await hookManager.runHooks(HookRegister.AFTER_READ, {
				...hookParams,
				entities,
			})
		: { entities };

	logger.trace({ before: entities, after: hookEntities }, 'After read hooks ran');

	if (isList) {
		return hookEntities;
	} else {
		return hookEntities[0];
	}
};