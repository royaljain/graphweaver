import { gql } from '@apollo/client';
import pluralize from 'pluralize';
import { SortColumn } from 'react-data-grid';

import { Entity } from './use-schema';
// Can't use useApolloClient/useQuery/useParms here if not using Loader
import { apolloClient } from '../apollo';

export const PAGE_SIZE = 50;

export const getEntityPage = <T>(
	entity: Entity,
	sortColumns: readonly SortColumn[],
	entityByType: (type: string) => Entity,
	page: number
) => {
	const query = queryForEntityPage(entity, entityByType);

	const orderBy: { [field: string]: 'ASC' | 'DESC' } = {};
	for (const sortColumn of sortColumns) {
		orderBy[sortColumn.columnKey] = sortColumn.direction;
	}

	return apolloClient.query<T>({
		query,
		variables: {
			pagination: {
				offset: Math.max(page - 1, 0) * PAGE_SIZE,
				limit: PAGE_SIZE,
				orderBy,
			},
		},
	});
};

const queryForEntityPage = (entity: Entity, entityByType: (type: string) => Entity) => {
	// If the entity is called SomeThing then the query name is someThings.
	const pluralName = pluralize(entity.name);
	const queryName = pluralName[0].toLowerCase() + pluralName.slice(1);

	// TODO: Is there a better way to build this than a big string?
	//
	// We looked into generating an AST here but it's really verbose and
	// doesn't seem that much cleaner than just generating a string.
	return gql`
		query AdminUIListPage($pagination: ${pluralName}PaginationInput) {
			result: ${queryName}(pagination: $pagination) {
				${entity.fields
					.map((field) => {
						if (field.relationshipType) {
							const relatedEntity = entityByType(field.type);
							return `${field.name} { id ${relatedEntity.summaryField || ''} }`;
						} else {
							return field.name;
						}
					})
					.join(' ')}
			}
		}
	`;
};

export const getEntity = <T>(entity: Entity, id: string, entityByType?: (type: string) => Entity) =>
	apolloClient.query<T>({
		query: queryForEntity(entity, entityByType),
		variables: { id },
	});

const queryForEntity = (entity: Entity, entityByType?: (type: string) => Entity) => {
	// If the entity is called SomeThing then the query name is someThing.
	const queryName = entity.name[0].toLowerCase() + entity.name.slice(1);

	// TODO: Is there a better way to build this than a big string?
	//
	// We looked into generating an AST here but it's really verbose and
	// doesn't seem that much cleaner than just generating a string.
	return gql`
		query AdminUIDetail($id: ID!) {
			result: ${queryName}(id: $id) {
				${entity.fields
					.map((field) => {
						if (field.relationshipType) {
							if (!entityByType) {
								return `${field.name} { id }`;
							}
							const relatedEntity = entityByType(field.type);
							return `${field.name} { id ${relatedEntity.summaryField || ''} }`;
						} else {
							return field.name;
						}
					})
					.join(' ')}
			}
		}
	`;
};