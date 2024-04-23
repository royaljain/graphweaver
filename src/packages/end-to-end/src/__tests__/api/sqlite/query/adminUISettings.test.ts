import 'reflect-metadata';
import gql from 'graphql-tag';
import assert from 'assert';
import Graphweaver from '@exogee/graphweaver-server';
import {
	Entity as DataEntity,
	Collection,
	ManyToOne,
	OneToMany,
	PrimaryKey,
	Property,
} from '@mikro-orm/core';
import { Field, GraphQLEntity, GraphQLID, Entity, RelationshipField } from '@exogee/graphweaver';
import { BaseEntity, MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { Schema } from '@exogee/graphweaver-admin-ui-components';
import { MediaField, MediaTypes } from '@exogee/graphweaver-storage-provider';

import { SqliteDriver } from '@mikro-orm/sqlite';

/** Setup entities and resolvers  */
@DataEntity({ tableName: 'Album' })
class OrmAlbum extends BaseEntity {
	@PrimaryKey({ fieldName: 'AlbumId', type: 'number' })
	id!: number;

	@Property({ fieldName: 'Title', type: 'NVARCHAR(160)' })
	title!: string;

	@ManyToOne({
		entity: () => OrmArtist,
		ref: true,
		fieldName: 'ArtistId',
		index: 'IFK_AlbumArtistId',
	})
	artist!: OrmArtist;
}

@DataEntity({ tableName: 'Artist' })
class OrmArtist extends BaseEntity {
	@PrimaryKey({ fieldName: 'ArtistId', type: 'number' })
	id!: number;

	@Property({ fieldName: 'Name', type: 'NVARCHAR(120)', nullable: true })
	name?: string;

	@OneToMany({ entity: () => OrmAlbum, mappedBy: 'artist' })
	albums = new Collection<OrmAlbum>(this);
}

// Unless we run a local version of s3
// We can't test that we get a signed url back
// We can't test that we get a downwload url back from s3
// This is a mock to test the decorator
const mockS3StorageProvider = {
	getDownloadUrl: (key: string) => Promise.resolve(`https://example.com/${key}`),
};

const connection = {
	connectionManagerId: 'sqlite',
	mikroOrmConfig: {
		entities: [OrmAlbum, OrmArtist],
		driver: SqliteDriver,
		dbName: 'databases/database.sqlite',
	},
};

@Entity('Album', {
	provider: new MikroBackendProvider(OrmAlbum, connection),
	adminUIOptions: {
		hideInSideBar: true,
	},
})
export class Album extends GraphQLEntity<OrmAlbum> {
	public dataEntity!: OrmAlbum;

	@Field(() => GraphQLID)
	id!: number;

	@Field(() => String, { summaryField: true })
	title!: string;

	@RelationshipField<Album>(() => Artist, { id: (entity) => entity.artist?.id })
	artist!: Artist;
}

@Entity('Artist', {
	provider: new MikroBackendProvider(OrmArtist, connection),
	adminUIOptions: {
		defaultFilter: {
			name: 'test',
		} as any, // @todo remove cast,
	},
})
export class Artist extends GraphQLEntity<OrmArtist> {
	public dataEntity!: OrmArtist;

	@Field(() => GraphQLID)
	id!: number;

	// @todo implement hideFromDisplay
	// @AdminUISettings({
	// 	hideFromDisplay: true,
	// })
	@Field(() => String, { nullable: true })
	name?: string;

	// @todo implement hideFromFilterBar
	// @AdminUISettings({
	// 	hideFromFilterBar: true,
	// })
	@RelationshipField<Album>(() => [Album], { relatedField: 'artist' })
	albums!: Album[];

	@MediaField({
		storageProvider: mockS3StorageProvider,
		resourceId: 'title',
		mediaType: MediaTypes.IMAGE,
	})
	imageDownloadUrl?: string;

	@MediaField({
		storageProvider: mockS3StorageProvider,
		resourceId: 'title',
		mediaType: MediaTypes.OTHER,
	})
	otherMediaDownloadUrl?: string;
}

test('Test the decorator adminUISettings', async () => {
	const graphweaver = new Graphweaver();

	const response = await graphweaver.server.executeOperation({
		query: gql`
			{
				result: _graphweaver {
					entities {
						name
						backendId
						defaultFilter
						summaryField
						fields {
							name
							type
							relationshipType
							relatedEntity
							filter {
								type
								__typename
							}
							attributes {
								isReadOnly
								__typename
							}
							extensions {
								key
								__typename
							}
							__typename
						}
						attributes {
							isReadOnly
							__typename
						}
						__typename
					}
					enums {
						name
						values {
							name
							value
							__typename
						}
						__typename
					}
					__typename
				}
			}
		`,
	});
	assert(response.body.kind === 'single');
	const result = response.body.singleResult.data?.result as unknown as Schema;
	expect(result.entities).toHaveLength(1);

	const albumEntity = result.entities.find((entity) => entity.name === 'Album');
	expect(albumEntity).toBeUndefined();

	const artistEntity = result.entities.find((entity) => entity.name === 'Artist');
	expect(artistEntity).not.toBeNull();
	expect(artistEntity?.defaultFilter).toStrictEqual({ name: 'test' });

	const idField = artistEntity?.fields.find((field) => field.name === 'id');
	expect(idField).not.toBeNull();
	expect(idField?.filter).not.toBeNull();

	const nameField = artistEntity?.fields.find((field) => field.name === 'name');
	expect(nameField).toBeUndefined();

	const albumsField = artistEntity?.fields.find((field) => field.name === 'albums');
	expect(albumsField).not.toBeNull();
	expect(albumsField?.filter).toBeNull();

	// Test that the type of the imageDownloadUrl field is Image
	const imageDownloadUrlField = artistEntity?.fields.find(
		(field) => field.name === 'imageDownloadUrl'
	);
	expect(imageDownloadUrlField).not.toBeNull();
	expect(imageDownloadUrlField?.type).toBe('Image');

	// Test that the type of the otherMediaDownloadUrl field is Media
	const otherMediaDownloadUrlField = artistEntity?.fields.find(
		(field) => field.name === 'otherMediaDownloadUrl'
	);

	expect(otherMediaDownloadUrlField).not.toBeNull();
	expect(otherMediaDownloadUrlField?.type).toBe('Media');

	// Test that the field is readonly
	expect(imageDownloadUrlField?.attributes?.isReadOnly).toBe(true);
	expect(otherMediaDownloadUrlField?.attributes?.isReadOnly).toBe(true);

	// Test that the extension object exists and includes the key
	expect(imageDownloadUrlField?.extensions).not.toBeNull();
	expect(otherMediaDownloadUrlField?.extensions).not.toBeNull();
	expect(imageDownloadUrlField?.extensions?.key).toBe('title');
	expect(otherMediaDownloadUrlField?.extensions?.key).toBe('title');
});
