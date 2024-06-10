import {
	BaseDataProvider,
	Entity,
	Field,
	Filter,
	ID,
	RelationshipField,
} from '@exogee/graphweaver';

import { ProductVariation } from './product-variation';
import { ProductDimension } from './product-dimension';
import { ProductResearch } from './product-research';
import { User } from './user';
import { data } from '../data';

class JsonDataProvider extends BaseDataProvider<Product> {
	findOne(filter: Filter<Product>): Promise<Product> {
		const product = data.products.find((product) => product.id === filter.id);
		return Promise.resolve(product) as any;
	}
}

// type Product @custom @key(fields: "id") @key(fields: "sku package") @key(fields: "sku variation { id }") {
//   id: ID!
//   sku: String
//   package: String
//   variation: ProductVariation
//   dimensions: ProductDimension
//   createdBy: User @provides(fields: "totalProductsCreated")
//   notes: String @tag(name: "internal")
//   research: [ProductResearch!]!
// }

@Entity('Product', {
	provider: new JsonDataProvider('Product Management System'),
	directives: {
		custom: true,
	},
})
export class Product {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => String, { nullable: true })
	sku?: string;

	@Field(() => String, { nullable: true })
	package?: string;

	@RelationshipField(() => ProductVariation, { id: 'variation', nullable: true })
	variation?: ProductVariation;

	@RelationshipField(() => ProductDimension, { id: 'dimensions', nullable: true })
	dimensions?: ProductDimension;

	@RelationshipField(() => User, {
		id: 'createdBy',
		nullable: true,
		directives: { provides: { fields: 'totalProductsCreated' } },
	})
	createdBy!: User;

	@Field(() => String, { nullable: true, directives: { tag: { name: 'internal' } } })
	notes?: string;

	@RelationshipField(() => [ProductResearch], { id: 'research' })
	research!: ProductResearch;
}
