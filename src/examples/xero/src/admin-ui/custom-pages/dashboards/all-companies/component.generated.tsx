import * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ProfitAndLossRowsAllCompaniesQueryVariables = Types.Exact<{
  description: Types.Scalars['String']['input'];
}>;


export type ProfitAndLossRowsAllCompaniesQuery = { __typename?: 'Query', profitAndLossRows: Array<{ __typename?: 'ProfitAndLossRow', amount: number, date: any, tenant?: { __typename?: 'Tenant', id: string, tenantName: string } | null }> };


export const ProfitAndLossRowsAllCompaniesDocument = gql`
    query profitAndLossRowsAllCompanies($description: String!) {
  profitAndLossRows(filter: {description: $description}) {
    amount
    date
    tenant {
      id
      tenantName
    }
  }
}
    `;

/**
 * __useProfitAndLossRowsAllCompaniesQuery__
 *
 * To run a query within a React component, call `useProfitAndLossRowsAllCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfitAndLossRowsAllCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfitAndLossRowsAllCompaniesQuery({
 *   variables: {
 *      description: // value for 'description'
 *   },
 * });
 */
export function useProfitAndLossRowsAllCompaniesQuery(baseOptions: Apollo.QueryHookOptions<ProfitAndLossRowsAllCompaniesQuery, ProfitAndLossRowsAllCompaniesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfitAndLossRowsAllCompaniesQuery, ProfitAndLossRowsAllCompaniesQueryVariables>(ProfitAndLossRowsAllCompaniesDocument, options);
      }
export function useProfitAndLossRowsAllCompaniesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfitAndLossRowsAllCompaniesQuery, ProfitAndLossRowsAllCompaniesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfitAndLossRowsAllCompaniesQuery, ProfitAndLossRowsAllCompaniesQueryVariables>(ProfitAndLossRowsAllCompaniesDocument, options);
        }
export type ProfitAndLossRowsAllCompaniesQueryHookResult = ReturnType<typeof useProfitAndLossRowsAllCompaniesQuery>;
export type ProfitAndLossRowsAllCompaniesLazyQueryHookResult = ReturnType<typeof useProfitAndLossRowsAllCompaniesLazyQuery>;
export type ProfitAndLossRowsAllCompaniesQueryResult = Apollo.QueryResult<ProfitAndLossRowsAllCompaniesQuery, ProfitAndLossRowsAllCompaniesQueryVariables>;