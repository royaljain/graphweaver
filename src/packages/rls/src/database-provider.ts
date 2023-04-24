import {
	EntityMetadataMap,
	Filter,
	GraphQLEntity,
	PaginationOptions,
	Sort,
} from '@exogee/graphweaver';
import { FilterQuery, IsolationLevel, MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { logger } from '@exogee/logger';
import { ForbiddenError } from 'apollo-server-errors';

import {
	checkAuthorization,
	GENERIC_AUTH_ERROR_MESSAGE,
	requiredPermissionsForAction,
} from './auth-utils';
import { AccessType } from './types';
import {
	andFilters,
	buildAccessControlEntryForUser,
	evaluateConsolidatedAccessControlValue,
	getRolesFromAuthorizationContext,
} from './helper-functions';

export class RLSMikroBackendProvider<
	T extends Record<string, unknown>,
	G extends GraphQLEntity<T>
> extends MikroBackendProvider<T, G> {
	private readonly gqlTypeName: string;

	constructor(mikroType: new () => T, gqlType: new (dataEntity: T) => G) {
		super(mikroType);
		this.gqlTypeName = gqlType.name;
	}

	private getAcl = () => {
		const acl = EntityMetadataMap.get(this.gqlTypeName)?.accessControlList;
		if (acl) return acl;
		else throw new Error(`Could not get ACL for ${this.gqlTypeName}`);
	};

	public async find(
		filter: Filter<G>,
		pagination?: PaginationOptions,
		additionalOptionsForBackend?: any
	): Promise<T[]> {
		// Check permissions for this (root level) entity for the currently logged in user
		const consolidatedAclEntry = buildAccessControlEntryForUser(
			this.getAcl(),
			getRolesFromAuthorizationContext()
		);

		const readEntry = consolidatedAclEntry[AccessType.Read];
		if (!readEntry) {
			logger.trace(`Raising ForbiddenError: User does not have read access on this entity`);
			throw new ForbiddenError(GENERIC_AUTH_ERROR_MESSAGE);
		}

		// If there are conditional permission filters, augment the supplied filter with them
		const accessFilter = await evaluateConsolidatedAccessControlValue(readEntry);

		// Permission checks complete, call the parent class provider function
		return super.find(andFilters(filter, accessFilter), pagination, additionalOptionsForBackend);
	}

	public async findOne(filter: Filter<G>): Promise<T | null> {
		const consolidatedAclEntry = buildAccessControlEntryForUser(
			this.getAcl(),
			getRolesFromAuthorizationContext()
		);

		if (!consolidatedAclEntry[AccessType.Read]) {
			logger.trace(`Raising ForbiddenError: User does not have read access on this entity`);
			throw new ForbiddenError(GENERIC_AUTH_ERROR_MESSAGE);
		}

		// Filter for a single record by ID
		const where: Filter<G> = filter;

		// If there are conditional permission filters, augment the supplied filter with them
		const readEntry = consolidatedAclEntry[AccessType.Read];
		const accessFilter = readEntry
			? await evaluateConsolidatedAccessControlValue(readEntry)
			: undefined;

		const result = await super.find(accessFilter ? andFilters(where, accessFilter) : where, {
			orderBy: { id: Sort.ASC },
			offset: 0,
			limit: 1,
		});

		return result[0];
	}

	public async updateOne(id: string, updateArgs: Partial<G>): Promise<T> {
		const entity = await this.transactional<T>(async () => {
			// First check whether the user is allowed to update this record as-is
			const entityBeforeUpdate = await this.em.findOne(this.entityType, id, {
				// This is an optimization so that checkAuthorization() doesn't have to go fetch everything one at a time.
				populate: [
					...this.visitPathForPopulate(this.entityType.name, updateArgs),
				] as `${string}.`[],
			});
			if (!entityBeforeUpdate) {
				throw new Error(`Could not find a ${this.gqlTypeName} record with ID ${id}`);
			}
			await checkAuthorization(entityBeforeUpdate, updateArgs, AccessType.Update);
			// Now attempt to perform the update, and check whether the result passes
			// the authorisation checks as well
			const updateResult = await super.updateOne(id, updateArgs as any);
			await checkAuthorization(updateResult, updateArgs, AccessType.Update);
			// Operation is allowed
			return updateResult;
		}, IsolationLevel.REPEATABLE_READ);

		return entity;
	}

	public async updateMany(entities: (Partial<G> & { id: string })[]): Promise<T[]> {
		// TODO: Check authorisation both before and after updates
		const result = await this.transactional<T[]>(async () => {
			const updateManyResult = await super.updateMany(entities);

			const authChecks: Promise<any>[] = [];
			for (const [index, entity] of updateManyResult.entries()) {
				authChecks.push(checkAuthorization(entity, entities[index], AccessType.Update));
			}
			await Promise.all(authChecks);

			return updateManyResult;
		}, IsolationLevel.REPEATABLE_READ);

		return result;
	}

	public async createOne(entity: Partial<G>): Promise<T> {
		const result = await this.transactional<T>(async () => {
			const createResult = await super.createOne(entity);
			await checkAuthorization(createResult, entity, AccessType.Create);
			return createResult;
		}, IsolationLevel.REPEATABLE_READ);

		return result;
	}

	public async createMany(entities: Partial<G>[]): Promise<T[]> {
		const result = await this.transactional<T[]>(async () => {
			const createManyResult = await super.createMany(entities);
			await this.em.flush(); // This is required to assign IDs to the candidate records

			const authChecks: Promise<any>[] = [];
			for (const [index, entity] of createManyResult.entries()) {
				authChecks.push(checkAuthorization(entity, entities[index], AccessType.Create));
			}
			await Promise.all(authChecks);

			return createManyResult;
		}, IsolationLevel.REPEATABLE_READ);

		return result;
	}

	public async createOrUpdateMany(entities: Partial<G>[]): Promise<T[]> {
		// TODO: Check authorisation both before and after updates
		const result = await this.transactional<T[]>(async () => {
			const createOrUpdateManyResult = await super.createOrUpdateMany(entities);
			await this.em.flush(); // This is required to assign IDs any newly created records

			const authChecks: Promise<any>[] = [];
			for (const [index, entity] of createOrUpdateManyResult.entries()) {
				authChecks.push(
					checkAuthorization(entity, entities[index], requiredPermissionsForAction(entities[index]))
				);
			}
			await Promise.all(authChecks);

			return createOrUpdateManyResult;
		}, IsolationLevel.REPEATABLE_READ);

		return result;
	}

	public async deleteOne(filter: Filter<G>): Promise<boolean> {
		const entity = await this.em.findOneOrFail(this.entityType, filter as FilterQuery<T>);
		const { id } = filter;
		if (!id) throw new Error('Check Authorization Error: No ID specified');
		await checkAuthorization(entity, { id: filter.id }, AccessType.Delete);
		return super.deleteOne(filter);
	}
}
