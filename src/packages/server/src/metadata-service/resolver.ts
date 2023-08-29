import {
	EntityMetadataMap,
	isSummaryField,
	AdminUISettingsMap,
	AdminUIFilterType,
	RelationshipType,
	BaseContext,
} from '@exogee/graphweaver';
import { Ctx, getMetadataStorage, Query, Resolver } from 'type-graphql';
import { ObjectClassMetadata } from 'type-graphql/dist/metadata/definitions/object-class-metdata';
import { EnumMetadata } from 'type-graphql/dist/metadata/definitions';
import { AdminUiMetadata } from './metadata';
import { AdminUiFieldMetadata } from './field';
import { AdminUiEntityMetadata } from './entity';
import { AdminMetadata } from '..';

const mapFilterType = (field: AdminUiFieldMetadata, enums: EnumMetadata[]): AdminUIFilterType => {
	// Check if we have a relationship
	if (field.relationshipType) {
		return AdminUIFilterType.RELATIONSHIP;
	}

	// Check if we have an enum
	const isEnum = enums.find((value) => value.name === field.type);
	if (isEnum) return AdminUIFilterType.ENUM;

	// Otherwise check the type
	switch (field.type) {
		case 'ID':
			return AdminUIFilterType.TEXT;
		case 'Number':
			return AdminUIFilterType.NUMERIC;
		case 'String':
			return AdminUIFilterType.TEXT;
		case 'ISOString':
			return AdminUIFilterType.DATE_RANGE;
		default:
			return AdminUIFilterType.TEXT;
	}
};

export const getAdminUiMetadataResolver = (hooks?: AdminMetadata['hooks']) => {
	@Resolver((of) => AdminUiMetadata)
	class AdminUiMetadataResolver {
		@Query(() => AdminUiMetadata, { name: '_graphweaver' })
		public async getAdminUiMetadata<C extends BaseContext>(@Ctx() context: C) {
			await hooks?.beforeRead?.({ context });
			const metadata = getMetadataStorage();

			// Build some lookups for more efficient data locating later.
			const objectTypeData: { [entityName: string]: ObjectClassMetadata } = {};
			for (const objectType of metadata.objectTypes) {
				objectTypeData[objectType.target.name] = objectType;
			}

			const enumMetadata = new Map<object, EnumMetadata>();
			for (const registeredEnum of metadata.enums) {
				enumMetadata.set(registeredEnum.enumObj, registeredEnum);
			}

			const entities: AdminUiEntityMetadata[] = metadata.objectTypes
				.map((objectType) => {
					const name = objectType.name;
					const adminUISettings = AdminUISettingsMap.get(name);
					const backendId = EntityMetadataMap.get(name)?.provider?.backendId ?? null;
					const summaryField = objectType.fields?.find((field) =>
						isSummaryField(objectType.target, field.name)
					)?.name;
					const fields = objectType.fields?.map((field) => {
						const typeValue = field.getType() as any;
						const entityName = typeValue.name ? typeValue.name : enumMetadata.get(typeValue)?.name;
						const relatedObject = objectTypeData[entityName];
						const fieldObject: AdminUiFieldMetadata = {
							name: field.name,
							type: relatedObject?.name || entityName,
						};
						// Check if we have an array of related entities
						if (field.typeOptions.array && relatedObject) {
							const relatedEntity = relatedObject.fields?.find((field) => {
								const fieldType = field.getType() as any;
								return fieldType.name === objectType.target.name;
							});
							if (relatedEntity?.typeOptions) {
								fieldObject.relationshipType = relatedEntity.typeOptions.array
									? RelationshipType.MANY_TO_MANY
									: RelationshipType.ONE_TO_MANY;
							}
							fieldObject.relatedEntity = relatedObject.name;
						} else if (relatedObject) {
							fieldObject.relationshipType = RelationshipType.MANY_TO_ONE;
						}
						fieldObject.filter = adminUISettings?.fields?.[field.name]?.filter?.hide
							? undefined
							: {
									type: mapFilterType(fieldObject, metadata.enums),
							  };
						return fieldObject;
					});
					return {
						name,
						backendId,
						summaryField,
						fields,
					};
				})
				.filter((entity) => !!entity.backendId);

			const enums = metadata.enums.map((registeredEnum) => ({
				name: registeredEnum.name,
				values: Object.entries(registeredEnum.enumObj).map(([name, value]) => ({
					name,
					value,
				})),
			}));

			const params = hooks?.afterRead
				? await hooks.afterRead({ context, metadata: { entities, enums } })
				: {
						metadata: { entities, enums },
				  };

			return params?.metadata;
		}
	}

	return AdminUiMetadataResolver;
};
