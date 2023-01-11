import { LoaderFunctionArgs, defer } from 'react-router-dom';
import { getEntity, getEntityPage } from '~/utils/data-loading';
import { SCHEMA_QUERY } from '~/utils/graphql';
import { client } from '~/apollo';
import { Schema } from '~/utils/use-schema';
import { SortColumn } from 'react-data-grid';

const cleaningPattern = /[^a-zA-Z0-9]/g;

const {
	data: { result: schema },
} = await client.query<{ result: Schema }>({ query: SCHEMA_QUERY });

const entityByNameOrType = (entity: string | undefined) => {
	const cleaned = entity?.replaceAll(cleaningPattern, '');
	const selectedEntity = schema.entities.find((e: any) => e.name === cleaned);

	if (!selectedEntity) throw new Error(`Unknown entity ${entity}.`);

	return selectedEntity;
};

/** @deprecated see use... hooks below */
export const ListLoader = <T>({ params: { entity, id } }: LoaderFunctionArgs) =>
	defer({
		rows: getEntityPage<T>(entityByNameOrType(entity), [], entityByNameOrType, 1),
		detail: id ? getEntity<T>(entityByNameOrType(entity), id) : undefined,
	});

export const useListFetch = <T>(entity: string, sortColumns?: SortColumn[], page?: number) => {
	const result = getEntityPage<T>(
		entityByNameOrType(entity),
		sortColumns || [],
		entityByNameOrType,
		page ?? 1
	);

	return result;
};

export const useEntityFetch = <T>(entity: string, id?: string) => {
	const detail = id ? getEntity<T>(entityByNameOrType(entity), id) : undefined;

	return detail;
};
