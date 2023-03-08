import { BigIntType, Collection, Entity, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { BaseEntity } from '@exogee/graphweaver-mikroorm';

import { User } from '../../entities';

@Entity()
export class Skill extends BaseEntity {
	@PrimaryKey({ type: BigIntType })
	id!: string;

	@Property({ type: String })
	name!: string;

	@ManyToMany({ entity: () => User, mappedBy: 'skills' })
	users = new Collection<User>(this);
}