/* eslint-disable */
/* 
* This file is auto-generated by Graphweaver. 
* Please do not edit it directly.
*/
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  _Any: { input: any; output: any; }
  federation__FieldSet: { input: any; output: any; }
  link__Import: { input: any; output: any; }
};

export type AdminUiEntityAttributeMetadata = {
  __typename?: 'AdminUiEntityAttributeMetadata';
  exportPageSize?: Maybe<Scalars['Float']['output']>;
  isReadOnly?: Maybe<Scalars['Boolean']['output']>;
};

export type AdminUiEntityMetadata = {
  __typename?: 'AdminUiEntityMetadata';
  attributes: AdminUiEntityAttributeMetadata;
  backendId?: Maybe<Scalars['String']['output']>;
  defaultFilter?: Maybe<Scalars['JSON']['output']>;
  fields: Array<AdminUiFieldMetadata>;
  name: Scalars['String']['output'];
  plural: Scalars['String']['output'];
  primaryKeyField: Scalars['String']['output'];
  summaryField?: Maybe<Scalars['String']['output']>;
  supportedAggregationTypes: Array<AggregationType>;
};

export type AdminUiEnumMetadata = {
  __typename?: 'AdminUiEnumMetadata';
  name: Scalars['String']['output'];
  values: Array<AdminUiEnumValueMetadata>;
};

export type AdminUiEnumValueMetadata = {
  __typename?: 'AdminUiEnumValueMetadata';
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type AdminUiFieldAttributeMetadata = {
  __typename?: 'AdminUiFieldAttributeMetadata';
  isReadOnly: Scalars['Boolean']['output'];
  isRequired: Scalars['Boolean']['output'];
};

export type AdminUiFieldExtensionsMetadata = {
  __typename?: 'AdminUiFieldExtensionsMetadata';
  key?: Maybe<Scalars['String']['output']>;
};

export type AdminUiFieldMetadata = {
  __typename?: 'AdminUiFieldMetadata';
  attributes?: Maybe<AdminUiFieldAttributeMetadata>;
  extensions?: Maybe<AdminUiFieldExtensionsMetadata>;
  filter?: Maybe<AdminUiFilterMetadata>;
  isArray?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  relatedEntity?: Maybe<Scalars['String']['output']>;
  relationshipType?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

export type AdminUiFilterMetadata = {
  __typename?: 'AdminUiFilterMetadata';
  type: AdminUiFilterType;
};

export enum AdminUiFilterType {
  Boolean = 'BOOLEAN',
  DateRange = 'DATE_RANGE',
  Enum = 'ENUM',
  Numeric = 'NUMERIC',
  Relationship = 'RELATIONSHIP',
  Text = 'TEXT'
}

export type AdminUiMetadata = {
  __typename?: 'AdminUiMetadata';
  entities: Array<AdminUiEntityMetadata>;
  enums: Array<AdminUiEnumMetadata>;
  federationSubgraphName?: Maybe<Scalars['String']['output']>;
};

export type AggregationResultFromTestSubgraph = {
  __typename?: 'AggregationResultFromTestSubgraph';
  count: Scalars['Int']['output'];
};

export enum AggregationType {
  Count = 'COUNT'
}

export type DeleteOneFilterInput = {
  id: Scalars['ID']['input'];
};

/** Data needed to create or update MultipleMedia. If an ID is passed, this is an update, otherwise it's an insert. */
export type MediaCreateOrUpdateInput = {
  filename?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<MediaType>;
};

export type MediaFromTestSubgraph = {
  __typename?: 'MediaFromTestSubgraph';
  filename: Scalars['String']['output'];
  type: MediaType;
  url: Scalars['String']['output'];
};

/** Data needed to create MultipleMedia. */
export type MediaInsertInput = {
  filename: Scalars['String']['input'];
  type: MediaType;
};

export enum MediaType {
  Image = 'IMAGE',
  Other = 'OTHER'
}

/** Data needed to update MultipleMedia. An ID must be passed. */
export type MediaUpdateInput = {
  filename?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<MediaType>;
};

export type MultipleMediaListFilter = {
  filename?: InputMaybe<Scalars['String']['input']>;
  filename_ilike?: InputMaybe<Scalars['String']['input']>;
  filename_in?: InputMaybe<Array<Scalars['String']['input']>>;
  filename_like?: InputMaybe<Scalars['String']['input']>;
  filename_ne?: InputMaybe<Scalars['String']['input']>;
  filename_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  filename_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  filename_null?: InputMaybe<Scalars['Boolean']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  url_ilike?: InputMaybe<Scalars['String']['input']>;
  url_in?: InputMaybe<Array<Scalars['String']['input']>>;
  url_like?: InputMaybe<Scalars['String']['input']>;
  url_ne?: InputMaybe<Scalars['String']['input']>;
  url_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  url_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  url_null?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create or update many Submissions. */
  createOrUpdateSubmissions?: Maybe<Array<Maybe<Submission>>>;
  /** Create a single Submission. */
  createSubmission?: Maybe<Submission>;
  /** Create many Submissions. */
  createSubmissions?: Maybe<Array<Maybe<Submission>>>;
  /** Delete a single Submission. */
  deleteSubmission?: Maybe<Scalars['Boolean']['output']>;
  /** Delete many Submissions with a filter. */
  deleteSubmissions?: Maybe<Scalars['Boolean']['output']>;
  getDeleteUrl?: Maybe<Scalars['String']['output']>;
  getUploadUrl?: Maybe<Scalars['JSON']['output']>;
  /** Update a single Submission. */
  updateSubmission?: Maybe<Submission>;
  /** Update many Submissions. */
  updateSubmissions?: Maybe<Array<Maybe<Submission>>>;
};


export type MutationCreateOrUpdateSubmissionsArgs = {
  input: Array<SubmissionCreateOrUpdateInput>;
};


export type MutationCreateSubmissionArgs = {
  input: SubmissionInsertInput;
};


export type MutationCreateSubmissionsArgs = {
  input: Array<SubmissionInsertInput>;
};


export type MutationDeleteSubmissionArgs = {
  filter: DeleteOneFilterInput;
};


export type MutationDeleteSubmissionsArgs = {
  filter: SubmissionsListFilter;
};


export type MutationGetDeleteUrlArgs = {
  key?: InputMaybe<Scalars['String']['input']>;
};


export type MutationGetUploadUrlArgs = {
  key?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateSubmissionArgs = {
  input: SubmissionUpdateInput;
};


export type MutationUpdateSubmissionsArgs = {
  input: Array<SubmissionUpdateInput>;
};

export type Query = {
  __typename?: 'Query';
  /** Union of all types in this subgraph. This information is needed by the Apollo federation gateway. */
  _entities: Array<Maybe<_Entity>>;
  /** Query used by the Admin UI to introspect the schema and metadata. */
  _graphweaver?: Maybe<AdminUiMetadata>;
  /** The sdl representing the federated service capabilities. Includes federation directives, removes federation types, and includes rest of full schema after schema directives have been applied. */
  _service?: Maybe<_Service>;
  getDownloadUrl?: Maybe<Scalars['String']['output']>;
  /** Get a single Submission. */
  submission?: Maybe<Submission>;
  /** Get multiple Submissions. */
  submissions?: Maybe<Array<Maybe<Submission>>>;
  /** Get aggregated data for Submissions. */
  submissions_aggregate?: Maybe<AggregationResultFromTestSubgraph>;
};


export type Query_EntitiesArgs = {
  representations?: InputMaybe<Array<Scalars['_Any']['input']>>;
};


export type QueryGetDownloadUrlArgs = {
  key?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySubmissionArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySubmissionsArgs = {
  filter?: InputMaybe<SubmissionsListFilter>;
  pagination?: InputMaybe<SubmissionsPaginationInput>;
};


export type QuerySubmissions_AggregateArgs = {
  filter?: InputMaybe<SubmissionsListFilter>;
};

export enum Sort {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Submission = {
  __typename?: 'Submission';
  id: Scalars['ID']['output'];
  image?: Maybe<MediaFromTestSubgraph>;
};

/** Data needed to create or update Submissions. If an ID is passed, this is an update, otherwise it's an insert. */
export type SubmissionCreateOrUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  image?: InputMaybe<MediaCreateOrUpdateInput>;
};

/** Data needed to create Submissions. */
export type SubmissionInsertInput = {
  image?: InputMaybe<MediaCreateOrUpdateInput>;
};

/** Data needed to update Submissions. An ID must be passed. */
export type SubmissionUpdateInput = {
  id: Scalars['ID']['input'];
  image?: InputMaybe<MediaCreateOrUpdateInput>;
};

export type SubmissionsListFilter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_ne?: InputMaybe<Scalars['ID']['input']>;
  id_nin?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  id_null?: InputMaybe<Scalars['Boolean']['input']>;
  image?: InputMaybe<MultipleMediaListFilter>;
};

export type SubmissionsOrderByInput = {
  id?: InputMaybe<Sort>;
};

/** Pagination options for Submissions. */
export type SubmissionsPaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SubmissionsOrderByInput>;
};

export type _Entity = MediaFromTestSubgraph | Submission;

export type _Service = {
  __typename?: '_Service';
  sdl: Scalars['String']['output'];
};

export enum Link__Purpose {
  Execution = 'EXECUTION',
  Security = 'SECURITY'
}
