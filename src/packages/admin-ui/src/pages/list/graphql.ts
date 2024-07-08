import { gql } from '@apollo/client';
import {
	AggregationType,
	Entity,
	generateGqlSelectForEntityFields,
} from '@exogee/graphweaver-admin-ui-components';

export const queryForEntityPage = (
	entityName: string,
	entityByType: (type: string) => Entity,
	federationSubgraphName?: string
) => {
	const entity = entityByType(entityName);
	const pluralName = entity.plural;
	const queryName = pluralName[0].toLowerCase() + pluralName.slice(1);
	const entityCanCount = entity.supportedAggregationTypes.includes(AggregationType.COUNT);

	return gql`
		query AdminUIListPage($filter: ${pluralName}ListFilter, $pagination: ${pluralName}PaginationInput) {
			result: ${queryName}(filter: $filter, pagination: $pagination) {
				${generateGqlSelectForEntityFields(entity, entityByType, federationSubgraphName)}
			}
			${entityCanCount ? `aggregate: ${queryName}_aggregate(filter: $filter) { count }` : ''}
		}
	`;
};
