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
  /** Image type scalar */
  Image: { input: any; output: any; }
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
  fields: Array<AdminUiFieldMetadata>;
  name: Scalars['String']['output'];
  summaryField?: Maybe<Scalars['String']['output']>;
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
  isReadOnly?: Maybe<Scalars['Boolean']['output']>;
};

export type AdminUiFieldExtentionsMetadata = {
  __typename?: 'AdminUiFieldExtentionsMetadata';
  key?: Maybe<Scalars['String']['output']>;
};

export type AdminUiFieldMetadata = {
  __typename?: 'AdminUiFieldMetadata';
  attributes?: Maybe<AdminUiFieldAttributeMetadata>;
  extensions?: Maybe<AdminUiFieldExtentionsMetadata>;
  filter?: Maybe<AdminUiFilterMetadata>;
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
};

export type Mutation = {
  __typename?: 'Mutation';
  createOrUpdateSubmissions: Array<Submission>;
  createSubmission: Submission;
  createSubmissions: Array<Submission>;
  deleteSubmission: Scalars['Boolean']['output'];
  deleteSubmissions: Scalars['Boolean']['output'];
  getUploadUrl: Scalars['String']['output'];
  updateSubmission: Submission;
  updateSubmissions: Array<Submission>;
};


export type MutationCreateOrUpdateSubmissionsArgs = {
  input: SubmissionsCreateOrUpdateManyInput;
};


export type MutationCreateSubmissionArgs = {
  data: SubmissionInsertInput;
};


export type MutationCreateSubmissionsArgs = {
  input: SubmissionsInsertManyInput;
};


export type MutationDeleteSubmissionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteSubmissionsArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationGetUploadUrlArgs = {
  key: Scalars['ID']['input'];
};


export type MutationUpdateSubmissionArgs = {
  data: SubmissionCreateOrUpdateInput;
};


export type MutationUpdateSubmissionsArgs = {
  input: SubmissionsUpdateManyInput;
};

export type Query = {
  __typename?: 'Query';
  _graphweaver: AdminUiMetadata;
  getDownloadUrl: Scalars['String']['output'];
  submission?: Maybe<Submission>;
  submissions: Array<Submission>;
};


export type QueryGetDownloadUrlArgs = {
  key: Scalars['ID']['input'];
};


export type QuerySubmissionArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySubmissionsArgs = {
  filter?: InputMaybe<SubmissionsListFilter>;
  pagination?: InputMaybe<SubmissionsPaginationInput>;
};

export enum Sort {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Submission = {
  __typename?: 'Submission';
  downloadUrl?: Maybe<Scalars['Image']['output']>;
  id: Scalars['ID']['output'];
  key?: Maybe<Scalars['String']['output']>;
};

export type SubmissionCreateOrUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
};

export type SubmissionInsertInput = {
  key?: InputMaybe<Scalars['String']['input']>;
};

export type SubmissionsCreateOrUpdateManyInput = {
  data: Array<SubmissionCreateOrUpdateInput>;
};

export type SubmissionsInsertManyInput = {
  data: Array<SubmissionInsertInput>;
};

export type SubmissionsListFilter = {
  _and?: InputMaybe<Array<SubmissionsListFilter>>;
  _not?: InputMaybe<SubmissionsListFilter>;
  _or?: InputMaybe<Array<SubmissionsListFilter>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_ne?: InputMaybe<Scalars['ID']['input']>;
  id_nin?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_notnull?: InputMaybe<Scalars['ID']['input']>;
  id_null?: InputMaybe<Scalars['ID']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  key_ilike?: InputMaybe<Scalars['String']['input']>;
  key_in?: InputMaybe<Array<Scalars['String']['input']>>;
  key_like?: InputMaybe<Scalars['String']['input']>;
  key_ne?: InputMaybe<Scalars['String']['input']>;
  key_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  key_notnull?: InputMaybe<Scalars['String']['input']>;
  key_null?: InputMaybe<Scalars['String']['input']>;
};

export type SubmissionsOrderByInput = {
  id?: InputMaybe<Sort>;
  key?: InputMaybe<Sort>;
};

export type SubmissionsPaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SubmissionsOrderByInput>;
};

export type SubmissionsUpdateManyInput = {
  data: Array<SubmissionCreateOrUpdateInput>;
};
