import 'reflect-metadata';
import gql from 'graphql-tag';
import assert from 'assert';
import Graphweaver from '@exogee/graphweaver-server';
import {
	Entity,
	Collection,
	IdentifiedReference,
	ManyToOne,
	OneToMany,
	PrimaryKey,
} from '@mikro-orm/core';
import {
	createBaseResolver,
	Field,
	GraphQLEntity,
	ID,
	ObjectType,
	RelationshipField,
	Resolver,
} from '@exogee/graphweaver';
import { BaseEntity, MikroBackendProvider } from '@exogee/graphweaver-mikroorm';

import { resetDatabase } from '../../../../utils';

import { SqliteDriver } from '@mikro-orm/sqlite';

/** Setup entities and resolvers  */
@Entity({ tableName: 'Album' })
class OrmAlbum extends BaseEntity {
	@PrimaryKey({ fieldName: 'AlbumId', type: 'number' })
	id!: number;

	@ManyToOne({
		entity: () => OrmArtist,
		wrappedReference: true,
		fieldName: 'ArtistId',
		index: 'IFK_AlbumArtistId',
	})
	artist!: IdentifiedReference<OrmArtist>;
}

@Entity({ tableName: 'Artist' })
class OrmArtist extends BaseEntity {
	@PrimaryKey({ fieldName: 'ArtistId', type: 'number' })
	id!: number;

	@OneToMany({ entity: () => OrmAlbum, mappedBy: 'artist' })
	albums = new Collection<OrmAlbum>(this);
}

@ObjectType('TestAlbum')
export class Album extends GraphQLEntity<OrmAlbum> {
	public dataEntity!: OrmAlbum;

	@Field(() => ID)
	id!: number;

	@RelationshipField<Album>(() => Artist, { id: (entity) => entity.artist?.id })
	renamedArtist!: Artist;
}

@ObjectType('TestArtist')
export class Artist extends GraphQLEntity<OrmArtist> {
	public dataEntity!: OrmArtist;

	@Field(() => ID)
	id!: number;

	@RelationshipField<Album>(() => [Album], { relatedField: 'artist' })
	renamedAlbums!: Album[];
}

const connection = {
	connectionManagerId: 'sqlite',
	mikroOrmConfig: {
		entities: [OrmAlbum, OrmArtist],
		driver: SqliteDriver,
		dbName: 'databases/database.sqlite',
	},
};

@Resolver((of) => Album)
class AlbumResolver extends createBaseResolver<Album, OrmAlbum>(
	Album,
	new MikroBackendProvider(OrmAlbum, connection)
) {}

@Resolver((of) => Artist)
class ArtistResolver extends createBaseResolver<Artist, OrmArtist>(
	Artist,
	new MikroBackendProvider(OrmArtist, connection)
) {}

describe('RelationshipField', () => {
	beforeEach(resetDatabase);

	test('should not get error on buildSchema when object type name is not same as entity', async () => {
		const graphweaver = new Graphweaver({
			resolvers: [AlbumResolver, ArtistResolver],
		});

		const response = await graphweaver.server.executeOperation({
			query: gql`
				query {
					testAlbums {
						id
						renamedArtist {
							id
						}
					}
				}
			`,
		});
		assert(response.body.kind === 'single');
		expect(response.body.singleResult.data?.testAlbums).toHaveLength(347);
	});
});
