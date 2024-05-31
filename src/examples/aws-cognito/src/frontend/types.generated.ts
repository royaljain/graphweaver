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
};

export type CognitoUser = {
  __typename?: 'CognitoUser';
  attributes?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  enabled: Scalars['Boolean']['output'];
  groups?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  userStatus?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

/** Data needed to create or update CognitoUsers. If an ID is passed, this is an update, otherwise it's an insert. */
export type CognitoUserCreateOrUpdateInput = {
  attributes?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  groups?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  userStatus?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

/** Data needed to create CognitoUsers. */
export type CognitoUserInsertInput = {
  attributes?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  enabled: Scalars['Boolean']['input'];
  groups?: InputMaybe<Scalars['String']['input']>;
  userStatus?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};

/** Data needed to update CognitoUsers. An ID must be passed. */
export type CognitoUserUpdateInput = {
  attributes?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  groups?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  userStatus?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type CognitoUsersListFilter = {
  attributes?: InputMaybe<Scalars['String']['input']>;
  attributes_ilike?: InputMaybe<Scalars['String']['input']>;
  attributes_in?: InputMaybe<Array<Scalars['String']['input']>>;
  attributes_like?: InputMaybe<Scalars['String']['input']>;
  attributes_ne?: InputMaybe<Scalars['String']['input']>;
  attributes_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  attributes_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  attributes_null?: InputMaybe<Scalars['Boolean']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  email_ilike?: InputMaybe<Scalars['String']['input']>;
  email_in?: InputMaybe<Array<Scalars['String']['input']>>;
  email_like?: InputMaybe<Scalars['String']['input']>;
  email_ne?: InputMaybe<Scalars['String']['input']>;
  email_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  email_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  email_null?: InputMaybe<Scalars['Boolean']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  enabled_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  enabled_ne?: InputMaybe<Scalars['Boolean']['input']>;
  enabled_nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  enabled_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  enabled_null?: InputMaybe<Scalars['Boolean']['input']>;
  groups?: InputMaybe<Scalars['String']['input']>;
  groups_ilike?: InputMaybe<Scalars['String']['input']>;
  groups_in?: InputMaybe<Array<Scalars['String']['input']>>;
  groups_like?: InputMaybe<Scalars['String']['input']>;
  groups_ne?: InputMaybe<Scalars['String']['input']>;
  groups_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  groups_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  groups_null?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_ne?: InputMaybe<Scalars['ID']['input']>;
  id_nin?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  id_null?: InputMaybe<Scalars['Boolean']['input']>;
  userStatus?: InputMaybe<Scalars['String']['input']>;
  userStatus_ilike?: InputMaybe<Scalars['String']['input']>;
  userStatus_in?: InputMaybe<Array<Scalars['String']['input']>>;
  userStatus_like?: InputMaybe<Scalars['String']['input']>;
  userStatus_ne?: InputMaybe<Scalars['String']['input']>;
  userStatus_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  userStatus_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  userStatus_null?: InputMaybe<Scalars['Boolean']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  username_ilike?: InputMaybe<Scalars['String']['input']>;
  username_in?: InputMaybe<Array<Scalars['String']['input']>>;
  username_like?: InputMaybe<Scalars['String']['input']>;
  username_ne?: InputMaybe<Scalars['String']['input']>;
  username_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  username_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  username_null?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CognitoUsersOrderByInput = {
  attributes?: InputMaybe<Sort>;
  email?: InputMaybe<Sort>;
  enabled?: InputMaybe<Sort>;
  groups?: InputMaybe<Sort>;
  id?: InputMaybe<Sort>;
  userStatus?: InputMaybe<Sort>;
  username?: InputMaybe<Sort>;
};

/** Pagination options for CognitoUsers. */
export type CognitoUsersPaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CognitoUsersOrderByInput>;
};

export type DeleteOneFilterInput = {
  id: Scalars['ID']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a single CognitoUser. */
  createCognitoUser?: Maybe<CognitoUser>;
  /** Create many CognitoUsers. */
  createCognitoUsers?: Maybe<Array<Maybe<CognitoUser>>>;
  /** Create or update many CognitoUsers. */
  createOrUpdateCognitoUsers?: Maybe<Array<Maybe<CognitoUser>>>;
  /** Delete a single CognitoUser. */
  deleteCognitoUser?: Maybe<Scalars['Boolean']['output']>;
  /** Delete many CognitoUsers with a filter. */
  deleteCognitoUsers?: Maybe<Scalars['Boolean']['output']>;
  /** Update a single CognitoUser. */
  updateCognitoUser?: Maybe<CognitoUser>;
  /** Update many CognitoUsers. */
  updateCognitoUsers?: Maybe<Array<Maybe<CognitoUser>>>;
};


export type MutationCreateCognitoUserArgs = {
  input: CognitoUserInsertInput;
};


export type MutationCreateCognitoUsersArgs = {
  input: Array<CognitoUserInsertInput>;
};


export type MutationCreateOrUpdateCognitoUsersArgs = {
  input: Array<CognitoUserCreateOrUpdateInput>;
};


export type MutationDeleteCognitoUserArgs = {
  filter: DeleteOneFilterInput;
};


export type MutationDeleteCognitoUsersArgs = {
  filter: CognitoUsersListFilter;
};


export type MutationUpdateCognitoUserArgs = {
  input: CognitoUserUpdateInput;
};


export type MutationUpdateCognitoUsersArgs = {
  input: Array<CognitoUserUpdateInput>;
};

export type Query = {
  __typename?: 'Query';
  /** Query used by the Admin UI to introspect the schema and metadata. */
  _graphweaver?: Maybe<AdminUiMetadata>;
  /** Get a single CognitoUser. */
  cognitoUser?: Maybe<CognitoUser>;
  /** Get multiple CognitoUsers. */
  cognitoUsers?: Maybe<Array<Maybe<CognitoUser>>>;
};


export type QueryCognitoUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCognitoUsersArgs = {
  filter?: InputMaybe<CognitoUsersListFilter>;
  pagination?: InputMaybe<CognitoUsersPaginationInput>;
};

export enum Sort {
  Asc = 'ASC',
  Desc = 'DESC'
}
