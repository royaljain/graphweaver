import request from 'supertest-graphql';
import gql from 'graphql-tag';

import { Album, Artist } from '../../../types';
import { config } from '../../../config';
import { resetDatabase } from '../../../utils';

describe('nested create', () => {
	beforeEach(resetDatabase);

	test('should create an album and an artist', async () => {
		const { data } = await request<{ createAlbum: Album }>(config.baseUrl)
			.mutate(
				gql`
					mutation CreateAlbum($data: AlbumInsertInput!) {
						createAlbum(data: $data) {
							id
							ArtistId {
								id
								Name
							}
						}
					}
				`
			)
			.variables({ data: { ArtistId: { Name: 'string' }, Title: 'string' } })
			.expectNoErrors();

		expect(data?.createAlbum?.id).toBe('348');
		expect(data?.createAlbum?.ArtistId?.id).toBe('276');
		expect(data?.createAlbum?.ArtistId?.Name).toBe('string');
	});

	test('should create an artist and an album', async () => {
		const { data } = await request<{ createAlbum: Artist }>(config.baseUrl)
			.mutate(
				gql`
					mutation CreateArtist($data: ArtistInsertInput!) {
						createArtist(data: $data) {
							id
							ArtistIdInverse {
								id
								Title
							}
						}
					}
				`
			)
			.variables({ data: { ArtistIdInverse: [{ Title: 'string' }], Name: 'string' } })
			.expectNoErrors();

		expect(data?.createAlbum?.id).toBe('348');
		expect(data?.createAlbum?.ArtistIdInverse?.[0]?.id).toBe('276');
		expect(data?.createAlbum?.ArtistIdInverse?.[0]?.Title).toBe('string');
	});
});
