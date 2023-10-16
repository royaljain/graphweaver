import { BigIntType, Entity, PrimaryKey, Property, JsonType } from '@mikro-orm/core';
import { BaseEntity } from './base-entity';

import type { AuthenticationBaseEntity } from '@exogee/graphweaver-auth';

@Entity()
export class Authentication<T> extends BaseEntity implements AuthenticationBaseEntity<T> {
	@PrimaryKey({ type: BigIntType })
	id!: string;

	@Property({ type: String })
	type!: string;

	@Property({ type: BigIntType })
	userId!: string;

	@Property({ type: JsonType })
	data!: T;

	@Property({ type: Date })
	createdAt!: Date;
}
