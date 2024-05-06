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

export type ApiKey = {
  __typename?: 'ApiKey';
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  revoked?: Maybe<Scalars['Boolean']['output']>;
  roles?: Maybe<Array<Scalars['String']['output']>>;
};

export type ApiKeyCreateOrUpdateInput = {
  id: Scalars['ID']['input'];
  key?: InputMaybe<Scalars['String']['input']>;
  revoked?: InputMaybe<Scalars['Boolean']['input']>;
  roles?: InputMaybe<Array<Scalars['String']['input']>>;
  secret?: InputMaybe<Scalars['String']['input']>;
};

export type ApiKeyInsertInput = {
  key: Scalars['String']['input'];
  revoked?: InputMaybe<Scalars['Boolean']['input']>;
  roles?: InputMaybe<Array<Scalars['String']['input']>>;
  secret: Scalars['String']['input'];
};

export type ApiKeysListFilter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_ne?: InputMaybe<Scalars['ID']['input']>;
  id_nin?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  id_null?: InputMaybe<Scalars['Boolean']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  key_ilike?: InputMaybe<Scalars['String']['input']>;
  key_in?: InputMaybe<Array<Scalars['String']['input']>>;
  key_like?: InputMaybe<Scalars['String']['input']>;
  key_ne?: InputMaybe<Scalars['String']['input']>;
  key_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  key_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  key_null?: InputMaybe<Scalars['Boolean']['input']>;
  revoked?: InputMaybe<Scalars['Boolean']['input']>;
  revoked_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  revoked_ne?: InputMaybe<Scalars['Boolean']['input']>;
  revoked_nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  revoked_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  revoked_null?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ApiKeysOrderByInput = {
  id?: InputMaybe<Sort>;
  key?: InputMaybe<Sort>;
  revoked?: InputMaybe<Sort>;
  roles?: InputMaybe<Sort>;
};

/** Pagination options for ApiKeys. */
export type ApiKeysPaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ApiKeysOrderByInput>;
};

export type Credential = {
  __typename?: 'Credential';
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type CredentialCreateOrUpdateInput = {
  confirm?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type CredentialInsertInput = {
  confirm: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CredentialsListFilter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_ne?: InputMaybe<Scalars['ID']['input']>;
  id_nin?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  id_null?: InputMaybe<Scalars['Boolean']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  username_ilike?: InputMaybe<Scalars['String']['input']>;
  username_in?: InputMaybe<Array<Scalars['String']['input']>>;
  username_like?: InputMaybe<Scalars['String']['input']>;
  username_ne?: InputMaybe<Scalars['String']['input']>;
  username_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  username_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  username_null?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CredentialsOrderByInput = {
  id?: InputMaybe<Sort>;
  username?: InputMaybe<Sort>;
};

/** Pagination options for Credentials. */
export type CredentialsPaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CredentialsOrderByInput>;
};

export type DeleteOneFilterInput = {
  id: Scalars['ID']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  challengePassword?: Maybe<Token>;
  createApiKey?: Maybe<ApiKey>;
  createCredential?: Maybe<Credential>;
  /** Create or update many Tags. */
  createOrUpdateTags?: Maybe<Array<Maybe<Tag>>>;
  /** Create or update many Tasks. */
  createOrUpdateTasks?: Maybe<Array<Maybe<Task>>>;
  /** Create or update many Users. */
  createOrUpdateUsers?: Maybe<Array<Maybe<User>>>;
  /** Create a single Tag. */
  createTag?: Maybe<Tag>;
  /** Create many Tags. */
  createTags?: Maybe<Array<Maybe<Tag>>>;
  /** Create a single Task. */
  createTask?: Maybe<Task>;
  /** Create many Tasks. */
  createTasks?: Maybe<Array<Maybe<Task>>>;
  /** Create a single User. */
  createUser?: Maybe<User>;
  /** Create many Users. */
  createUsers?: Maybe<Array<Maybe<User>>>;
  /** Delete a single Tag. */
  deleteTag?: Maybe<Scalars['Boolean']['output']>;
  /** Delete many Tags with a filter. */
  deleteTags?: Maybe<Scalars['Boolean']['output']>;
  /** Delete a single Task. */
  deleteTask?: Maybe<Scalars['Boolean']['output']>;
  /** Delete many Tasks with a filter. */
  deleteTasks?: Maybe<Scalars['Boolean']['output']>;
  /** Delete a single User. */
  deleteUser?: Maybe<Scalars['Boolean']['output']>;
  /** Delete many Users with a filter. */
  deleteUsers?: Maybe<Scalars['Boolean']['output']>;
  enrolWallet?: Maybe<Scalars['Boolean']['output']>;
  loginPassword?: Maybe<Token>;
  passkeyGenerateAuthenticationOptions?: Maybe<Scalars['JSON']['output']>;
  passkeyGenerateRegistrationOptions?: Maybe<Scalars['JSON']['output']>;
  passkeyVerifyAuthenticationResponse?: Maybe<Token>;
  passkeyVerifyRegistrationResponse?: Maybe<Scalars['Boolean']['output']>;
  resetPassword?: Maybe<Scalars['Boolean']['output']>;
  sendChallengeMagicLink?: Maybe<Token>;
  sendLoginMagicLink?: Maybe<Scalars['Boolean']['output']>;
  sendOTPChallenge?: Maybe<Scalars['Boolean']['output']>;
  sendResetPasswordLink?: Maybe<Scalars['Boolean']['output']>;
  updateApiKey?: Maybe<ApiKey>;
  updateCredential?: Maybe<Credential>;
  /** Update a single Tag. */
  updateTag?: Maybe<Tag>;
  /** Update many Tags. */
  updateTags?: Maybe<Array<Maybe<Tag>>>;
  /** Update a single Task. */
  updateTask?: Maybe<Task>;
  /** Update many Tasks. */
  updateTasks?: Maybe<Array<Maybe<Task>>>;
  /** Update a single User. */
  updateUser?: Maybe<User>;
  /** Update many Users. */
  updateUsers?: Maybe<Array<Maybe<User>>>;
  verifyChallengeMagicLink?: Maybe<Token>;
  verifyLoginMagicLink?: Maybe<Token>;
  verifyOTPChallenge?: Maybe<Token>;
  verifyWeb3Challenge?: Maybe<Token>;
};


export type MutationChallengePasswordArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateApiKeyArgs = {
  input: ApiKeyInsertInput;
};


export type MutationCreateCredentialArgs = {
  input: CredentialInsertInput;
};


export type MutationCreateOrUpdateTagsArgs = {
  input: Array<TagCreateOrUpdateInput>;
};


export type MutationCreateOrUpdateTasksArgs = {
  input: Array<TaskCreateOrUpdateInput>;
};


export type MutationCreateOrUpdateUsersArgs = {
  input: Array<UserCreateOrUpdateInput>;
};


export type MutationCreateTagArgs = {
  input: TagInsertInput;
};


export type MutationCreateTagsArgs = {
  input: Array<TagInsertInput>;
};


export type MutationCreateTaskArgs = {
  input: TaskInsertInput;
};


export type MutationCreateTasksArgs = {
  input: Array<TaskInsertInput>;
};


export type MutationCreateUserArgs = {
  input: UserInsertInput;
};


export type MutationCreateUsersArgs = {
  input: Array<UserInsertInput>;
};


export type MutationDeleteTagArgs = {
  filter: DeleteOneFilterInput;
};


export type MutationDeleteTagsArgs = {
  filter: TagsListFilter;
};


export type MutationDeleteTaskArgs = {
  filter: DeleteOneFilterInput;
};


export type MutationDeleteTasksArgs = {
  filter: TasksListFilter;
};


export type MutationDeleteUserArgs = {
  filter: DeleteOneFilterInput;
};


export type MutationDeleteUsersArgs = {
  filter: UsersListFilter;
};


export type MutationEnrolWalletArgs = {
  token?: InputMaybe<Scalars['String']['input']>;
};


export type MutationLoginPasswordArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationPasskeyVerifyAuthenticationResponseArgs = {
  authenticationResponse: PasskeyAuthenticationResponse;
};


export type MutationPasskeyVerifyRegistrationResponseArgs = {
  registrationResponse: PasskeyRegistrationResponse;
};


export type MutationResetPasswordArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSendLoginMagicLinkArgs = {
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSendResetPasswordLinkArgs = {
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateApiKeyArgs = {
  input: ApiKeyCreateOrUpdateInput;
};


export type MutationUpdateCredentialArgs = {
  input: CredentialCreateOrUpdateInput;
};


export type MutationUpdateTagArgs = {
  input: TagUpdateInput;
};


export type MutationUpdateTagsArgs = {
  input: Array<TagUpdateInput>;
};


export type MutationUpdateTaskArgs = {
  input: TaskUpdateInput;
};


export type MutationUpdateTasksArgs = {
  input: Array<TaskUpdateInput>;
};


export type MutationUpdateUserArgs = {
  input: UserUpdateInput;
};


export type MutationUpdateUsersArgs = {
  input: Array<UserUpdateInput>;
};


export type MutationVerifyChallengeMagicLinkArgs = {
  token?: InputMaybe<Scalars['String']['input']>;
};


export type MutationVerifyLoginMagicLinkArgs = {
  token?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationVerifyOtpChallengeArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
};


export type MutationVerifyWeb3ChallengeArgs = {
  token?: InputMaybe<Scalars['String']['input']>;
};

export type PasskeyAuthenticationResponse = {
  authenticatorAttachment?: InputMaybe<Scalars['String']['input']>;
  clientExtensionResults: Scalars['JSON']['input'];
  id: Scalars['ID']['input'];
  rawId: Scalars['String']['input'];
  response: Scalars['JSON']['input'];
  type: Scalars['String']['input'];
};

export type PasskeyRegistrationResponse = {
  authenticatorAttachment?: InputMaybe<Scalars['String']['input']>;
  clientExtensionResults: Scalars['JSON']['input'];
  id: Scalars['ID']['input'];
  rawId: Scalars['String']['input'];
  response: Scalars['JSON']['input'];
  type: Scalars['String']['input'];
};

export enum Priority {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export type Query = {
  __typename?: 'Query';
  /** Query used by the Admin UI to introspect the schema and metadata. */
  _graphweaver?: Maybe<AdminUiMetadata>;
  /** Get a single ApiKey. */
  apiKey?: Maybe<ApiKey>;
  /** Get multiple ApiKeys. */
  apiKeys?: Maybe<Array<Maybe<ApiKey>>>;
  canEnrolWallet?: Maybe<Scalars['Boolean']['output']>;
  /** Get a single Credential. */
  credential?: Maybe<Credential>;
  /** Get multiple Credentials. */
  credentials?: Maybe<Array<Maybe<Credential>>>;
  /** Get a single Tag. */
  tag?: Maybe<Tag>;
  /** Get multiple Tags. */
  tags?: Maybe<Array<Maybe<Tag>>>;
  /** Get a single Task. */
  task?: Maybe<Task>;
  /** Get multiple Tasks. */
  tasks?: Maybe<Array<Maybe<Task>>>;
  /** Get a single User. */
  user?: Maybe<User>;
  /** Get multiple Users. */
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryApiKeyArgs = {
  id: Scalars['ID']['input'];
};


export type QueryApiKeysArgs = {
  filter?: InputMaybe<ApiKeysListFilter>;
  pagination?: InputMaybe<ApiKeysPaginationInput>;
};


export type QueryCredentialArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCredentialsArgs = {
  filter?: InputMaybe<CredentialsListFilter>;
  pagination?: InputMaybe<CredentialsPaginationInput>;
};


export type QueryTagArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTagsArgs = {
  filter?: InputMaybe<TagsListFilter>;
  pagination?: InputMaybe<TagsPaginationInput>;
};


export type QueryTaskArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTasksArgs = {
  filter?: InputMaybe<TasksListFilter>;
  pagination?: InputMaybe<TasksPaginationInput>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  filter?: InputMaybe<UsersListFilter>;
  pagination?: InputMaybe<UsersPaginationInput>;
};

export enum Roles {
  DarkSide = 'DARK_SIDE',
  LightSide = 'LIGHT_SIDE'
}

export enum Sort {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  tasks: Array<Task>;
};

/** Data needed to create or update Tags. If an ID is passed, this is an update, otherwise it's an insert. */
export type TagCreateOrUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  tasks?: InputMaybe<TaskInsertInput>;
};

/** Data needed to create Tags. */
export type TagInsertInput = {
  name: Scalars['String']['input'];
  tasks?: InputMaybe<Array<TaskCreateOrUpdateInput>>;
};

/** Data needed to update Tags. An ID must be passed. */
export type TagUpdateInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  tasks?: InputMaybe<TaskInsertInput>;
};

export type TagsListFilter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_ne?: InputMaybe<Scalars['ID']['input']>;
  id_nin?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  id_null?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_ilike?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  name_ne?: InputMaybe<Scalars['String']['input']>;
  name_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  name_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  name_null?: InputMaybe<Scalars['Boolean']['input']>;
  tasks?: InputMaybe<TasksListFilter>;
};

export type TagsOrderByInput = {
  id?: InputMaybe<Sort>;
  name?: InputMaybe<Sort>;
};

/** Pagination options for Tags. */
export type TagsPaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TagsOrderByInput>;
};

export type Task = {
  __typename?: 'Task';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isCompleted: Scalars['Boolean']['output'];
  priority?: Maybe<Priority>;
  slug?: Maybe<Scalars['String']['output']>;
  tags: Array<Tag>;
  user: User;
};

/** Data needed to create or update Tasks. If an ID is passed, this is an update, otherwise it's an insert. */
export type TaskCreateOrUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
  priority?: InputMaybe<Priority>;
  slug?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<TagInsertInput>;
  user?: InputMaybe<UserInsertInput>;
};

/** Data needed to create Tasks. */
export type TaskInsertInput = {
  description: Scalars['String']['input'];
  isCompleted: Scalars['Boolean']['input'];
  priority?: InputMaybe<Priority>;
  slug?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<TagCreateOrUpdateInput>>;
  user?: InputMaybe<UserCreateOrUpdateInput>;
};

/** Data needed to update Tasks. An ID must be passed. */
export type TaskUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
  priority?: InputMaybe<Priority>;
  slug?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<TagInsertInput>;
  user?: InputMaybe<UserInsertInput>;
};

export type TasksListFilter = {
  description?: InputMaybe<Scalars['String']['input']>;
  description_ilike?: InputMaybe<Scalars['String']['input']>;
  description_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_like?: InputMaybe<Scalars['String']['input']>;
  description_ne?: InputMaybe<Scalars['String']['input']>;
  description_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  description_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  description_null?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_ne?: InputMaybe<Scalars['ID']['input']>;
  id_nin?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  id_null?: InputMaybe<Scalars['Boolean']['input']>;
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
  isCompleted_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isCompleted_ne?: InputMaybe<Scalars['Boolean']['input']>;
  isCompleted_nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isCompleted_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  isCompleted_null?: InputMaybe<Scalars['Boolean']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_ilike?: InputMaybe<Scalars['String']['input']>;
  slug_in?: InputMaybe<Array<Scalars['String']['input']>>;
  slug_like?: InputMaybe<Scalars['String']['input']>;
  slug_ne?: InputMaybe<Scalars['String']['input']>;
  slug_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  slug_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  slug_null?: InputMaybe<Scalars['Boolean']['input']>;
  tags?: InputMaybe<TagsListFilter>;
  user?: InputMaybe<UsersListFilter>;
};

export type TasksOrderByInput = {
  description?: InputMaybe<Sort>;
  id?: InputMaybe<Sort>;
  isCompleted?: InputMaybe<Sort>;
  priority?: InputMaybe<Sort>;
  slug?: InputMaybe<Sort>;
};

/** Pagination options for Tasks. */
export type TasksPaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TasksOrderByInput>;
};

export type Token = {
  __typename?: 'Token';
  authToken: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

/** Data needed to create or update Users. If an ID is passed, this is an update, otherwise it's an insert. */
export type UserCreateOrUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Data needed to create Users. */
export type UserInsertInput = {
  name: Scalars['String']['input'];
};

/** Data needed to update Users. An ID must be passed. */
export type UserUpdateInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UsersListFilter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_ne?: InputMaybe<Scalars['ID']['input']>;
  id_nin?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  id_null?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_ilike?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  name_ne?: InputMaybe<Scalars['String']['input']>;
  name_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  name_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  name_null?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UsersOrderByInput = {
  id?: InputMaybe<Sort>;
  name?: InputMaybe<Sort>;
};

/** Pagination options for Users. */
export type UsersPaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UsersOrderByInput>;
};
