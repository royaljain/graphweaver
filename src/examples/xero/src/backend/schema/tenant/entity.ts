import { AdminUISettings, GraphQLEntity, SummaryField } from '@exogee/graphweaver';
import { Field, ID, ObjectType } from 'type-graphql';

// Xero doesn't provide a type for these for whatever reason. Both
// xero.tenants and xero.updateTenants() are typed as any[].
export interface XeroTenant {
	id: string;
	authEventId: string;
	tenantId: string;
	tenantType: 'ORGANISATION'; // Probably others, but can't find docs.
	tenantName: string;
	createdDateUtc: string; // ISO Date string
	updatedDateUtc: string; // ISO Date string

	// There are also org details, but we don't need those yet.
}

@ObjectType('Tenant')
export class Tenant extends GraphQLEntity<XeroTenant> {
	public dataEntity!: XeroTenant;

	@Field(() => ID)
	id!: string;

	@AdminUISettings({
		filter: {
			hide: true,
		},
	})
	@Field(() => String)
	authEventId!: string;

	@SummaryField()
	@Field(() => String)
	tenantName!: string;

	@Field(() => String)
	tenantType!: string;

	@AdminUISettings({
		filter: {
			hide: true,
		},
	})
	@Field(() => String)
	createdDateUtc!: string;

	@AdminUISettings({
		filter: {
			hide: true,
		},
	})
	@Field(() => String)
	updatedDateUtc!: string;
}
