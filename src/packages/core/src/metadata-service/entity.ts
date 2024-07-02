import { GraphQLJSON } from '@exogee/graphweaver-scalars';

import { AdminUiFieldMetadata } from './field';
import { AdminUiEntityAttributeMetadata } from './entity-attribute';
import { Entity, Field } from '../decorators';
import { AggregationType, Filter, Sort } from '../types';
import { graphweaverMetadata } from '../metadata';

graphweaverMetadata.collectEnumInformation({
	target: AggregationType,
	name: 'AggregationType',
});

@Entity('AdminUiEntityMetadata', {
	apiOptions: { excludeFromBuiltInOperations: true },
	directives: { inaccessible: true },
})
export class AdminUiEntityMetadata {
	@Field(() => String, { directives: { inaccessible: true } })
	name!: string;

	@Field(() => String, { directives: { inaccessible: true } })
	plural!: string;

	@Field(() => String, { nullable: true, directives: { inaccessible: true } })
	backendId?: string | null;

	@Field(() => String, { nullable: true, directives: { inaccessible: true } })
	summaryField?: string | null;

	@Field(() => String)
	fieldForDetailPanel!: string;

	@Field(() => String, { directives: { inaccessible: true } })
	primaryKeyField!: string;

	@Field(() => [AdminUiFieldMetadata], { directives: { inaccessible: true } })
	fields?: AdminUiFieldMetadata[] = [];

	@Field(() => GraphQLJSON, { nullable: true, directives: { inaccessible: true } })
	defaultFilter?: Filter<unknown>;

	@Field(() => GraphQLJSON, { nullable: true })
	defaultSort?: Partial<Record<string, Sort>>;

	@Field(() => AdminUiEntityAttributeMetadata, { directives: { inaccessible: true } })
	attributes?: AdminUiEntityAttributeMetadata;

	@Field(() => [AggregationType], { directives: { inaccessible: true } })
	supportedAggregationTypes!: AggregationType[];

	@Field(() => Boolean)
	hideInSideBar!: boolean;

	@Field(() => Boolean)
	excludeFromTracing!: boolean;
}
