import { AuthorizedBaseFunctions, createBaseResolver } from '@exogee/graphweaver';
import { AccessorParams, RestBackendProvider } from '@exogee/graphweaver-rest';
import url from 'url';

import { Resolver } from 'type-graphql';

import { People as RestPeople } from '../../entities';
import { Person } from './entity';
import { fetch } from '../../rest-client';
import { inMemoryFilterFor } from '../../utils';

@Resolver((of) => Person)
@AuthorizedBaseFunctions()
export class PersonResolver extends createBaseResolver(
	Person,
	new RestBackendProvider('People', {
		find: async ({ filter }: AccessorParams) => {
			const { results } = await fetch(`/people`);

			for (const person of results) {
				const paths = url
					.parse(person.url)
					.pathname?.split('/')
					.filter((part) => part);
				const id = paths?.[paths.length - 1];
				(person as RestPeople & { id: string }).id = id || 'null';
			}

			if (filter) {
				const memoryFilter = inMemoryFilterFor(filter);
				return results.filter(memoryFilter);
			}

			return results;
		},
	})
) {}
