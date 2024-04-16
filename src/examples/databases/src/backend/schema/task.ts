import {
	GraphQLEntity,
	RelationshipField,
	Field,
	GraphQLID,
	Entity,
	ReadOnlyProperty,
} from '@exogee/graphweaver';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { GraphQLJSON } from '@exogee/graphweaver-scalars';

import { Task as OrmTask } from '../entities';
import { User } from './user';
import { myConnection } from '../database';

@Entity('Task', {
	provider: new MikroBackendProvider(OrmTask, myConnection),
})
export class Task extends GraphQLEntity<OrmTask> {
	public dataEntity!: OrmTask;

	@Field(() => GraphQLID)
	id!: string;

	@Field(() => String)
	description!: string;

	@Field(() => Boolean)
	isCompleted!: boolean;

	// Example of a field resolver using a json type
	@ReadOnlyProperty()
	@Field(() => GraphQLJSON, { nullable: true })
	meta(task: Task) {
		return {
			id: task.id,
			description: task.description,
		};
	}

	@RelationshipField<Task>(() => User, { id: 'userId' })
	user!: User;
}
