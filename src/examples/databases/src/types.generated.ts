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

export type Mutation = {
  __typename?: 'Mutation';
  createOrUpdateTasks: Array<Task>;
  createOrUpdateUsers: Array<User>;
  createTask: Task;
  createTasks: Array<Task>;
  createUser: User;
  createUsers: Array<User>;
  deleteTask: Scalars['Boolean']['output'];
  deleteTasks: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  deleteUsers: Scalars['Boolean']['output'];
  updateTask: Task;
  updateTasks: Array<Task>;
  updateUser: User;
  updateUsers: Array<User>;
};


export type MutationCreateOrUpdateTasksArgs = {
  input: TasksCreateOrUpdateManyInput;
};


export type MutationCreateOrUpdateUsersArgs = {
  input: UsersCreateOrUpdateManyInput;
};


export type MutationCreateTaskArgs = {
  data: TaskInsertInput;
};


export type MutationCreateTasksArgs = {
  input: TasksInsertManyInput;
};


export type MutationCreateUserArgs = {
  data: UserInsertInput;
};


export type MutationCreateUsersArgs = {
  input: UsersInsertManyInput;
};


export type MutationDeleteTaskArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTasksArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUsersArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationUpdateTaskArgs = {
  data: TaskCreateOrUpdateInput;
};


export type MutationUpdateTasksArgs = {
  input: TasksUpdateManyInput;
};


export type MutationUpdateUserArgs = {
  data: UserCreateOrUpdateInput;
};


export type MutationUpdateUsersArgs = {
  input: UsersUpdateManyInput;
};

export type Query = {
  __typename?: 'Query';
  _graphweaver: AdminUiMetadata;
  task?: Maybe<Task>;
  tasks: Array<Task>;
  user?: Maybe<User>;
  users: Array<User>;
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

export enum Sort {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Task = {
  __typename?: 'Task';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isCompleted: Scalars['Boolean']['output'];
  meta: Scalars['JSON']['output'];
  user?: Maybe<User>;
};


export type TaskUserArgs = {
  filter?: InputMaybe<UsersListFilter>;
};

export type TaskCreateOrUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  user?: InputMaybe<UserCreateOrUpdateInput>;
};

export type TaskInsertInput = {
  description: Scalars['String']['input'];
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  user?: InputMaybe<UserCreateOrUpdateInput>;
};

export type TasksCreateOrUpdateManyInput = {
  data: Array<TaskCreateOrUpdateInput>;
};

export type TasksInsertManyInput = {
  data: Array<TaskInsertInput>;
};

export type TasksListFilter = {
  _and?: InputMaybe<Array<TasksListFilter>>;
  _not?: InputMaybe<TasksListFilter>;
  _or?: InputMaybe<Array<TasksListFilter>>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_ilike?: InputMaybe<Scalars['String']['input']>;
  description_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_like?: InputMaybe<Scalars['String']['input']>;
  description_ne?: InputMaybe<Scalars['String']['input']>;
  description_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  description_notnull?: InputMaybe<Scalars['String']['input']>;
  description_null?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_ne?: InputMaybe<Scalars['ID']['input']>;
  id_nin?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_notnull?: InputMaybe<Scalars['ID']['input']>;
  id_null?: InputMaybe<Scalars['ID']['input']>;
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  user?: InputMaybe<UsersListFilter>;
};

export type TasksOrderByInput = {
  description?: InputMaybe<Sort>;
  id?: InputMaybe<Sort>;
};

export type TasksPaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TasksOrderByInput>;
};

export type TasksUpdateManyInput = {
  data: Array<TaskCreateOrUpdateInput>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type UserCreateOrUpdateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UserInsertInput = {
  email: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UsersCreateOrUpdateManyInput = {
  data: Array<UserCreateOrUpdateInput>;
};

export type UsersInsertManyInput = {
  data: Array<UserInsertInput>;
};

export type UsersListFilter = {
  _and?: InputMaybe<Array<UsersListFilter>>;
  _not?: InputMaybe<UsersListFilter>;
  _or?: InputMaybe<Array<UsersListFilter>>;
  email?: InputMaybe<Scalars['String']['input']>;
  email_ilike?: InputMaybe<Scalars['String']['input']>;
  email_in?: InputMaybe<Array<Scalars['String']['input']>>;
  email_like?: InputMaybe<Scalars['String']['input']>;
  email_ne?: InputMaybe<Scalars['String']['input']>;
  email_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  email_notnull?: InputMaybe<Scalars['String']['input']>;
  email_null?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_ne?: InputMaybe<Scalars['ID']['input']>;
  id_nin?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_notnull?: InputMaybe<Scalars['ID']['input']>;
  id_null?: InputMaybe<Scalars['ID']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  username_ilike?: InputMaybe<Scalars['String']['input']>;
  username_in?: InputMaybe<Array<Scalars['String']['input']>>;
  username_like?: InputMaybe<Scalars['String']['input']>;
  username_ne?: InputMaybe<Scalars['String']['input']>;
  username_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  username_notnull?: InputMaybe<Scalars['String']['input']>;
  username_null?: InputMaybe<Scalars['String']['input']>;
};

export type UsersOrderByInput = {
  email?: InputMaybe<Sort>;
  id?: InputMaybe<Sort>;
  username?: InputMaybe<Sort>;
};

export type UsersPaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UsersOrderByInput>;
};

export type UsersUpdateManyInput = {
  data: Array<UserCreateOrUpdateInput>;
};
