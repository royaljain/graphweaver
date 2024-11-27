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
  /** Returns a string in simplified extended ISO format (ISO 8601), which is always 24 or 27 characters long (YYYY-MM-DDTHH:mm:ss.sssZ or ±YYYYYY-MM-DDTHH:mm:ss.sssZ, respectively). The timezone is always zero UTC offset, as denoted by the suffix "Z". */
  ISOString: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type Account = {
  __typename?: 'Account';
  code?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  tenant: Tenant;
  tenantId: Scalars['String']['output'];
  type?: Maybe<AccountType>;
};

/** Data needed to create or update Accounts. If an ID is passed, this is an update, otherwise it's an insert. */
export type AccountCreateOrUpdateInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  tenant?: InputMaybe<TenantCreateOrUpdateInput>;
  tenantId?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<AccountType>;
};

/** Data needed to create Accounts. */
export type AccountInsertInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  tenant?: InputMaybe<TenantCreateOrUpdateInput>;
  tenantId: Scalars['String']['input'];
  type?: InputMaybe<AccountType>;
};

export enum AccountType {
  Bank = 'BANK',
  Current = 'CURRENT',
  Currliab = 'CURRLIAB',
  Depreciatn = 'DEPRECIATN',
  Directcosts = 'DIRECTCOSTS',
  Equity = 'EQUITY',
  Expense = 'EXPENSE',
  Fixed = 'FIXED',
  Inventory = 'INVENTORY',
  Liability = 'LIABILITY',
  Noncurrent = 'NONCURRENT',
  Otherincome = 'OTHERINCOME',
  Overheads = 'OVERHEADS',
  Payg = 'PAYG',
  Prepayment = 'PREPAYMENT',
  Revenue = 'REVENUE',
  Sales = 'SALES',
  Termliab = 'TERMLIAB'
}

/** Data needed to update Accounts. An ID must be passed. */
export type AccountUpdateInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  tenant?: InputMaybe<TenantCreateOrUpdateInput>;
  tenantId?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<AccountType>;
};

export type AccountsListFilter = {
  _and?: InputMaybe<Array<InputMaybe<AccountsListFilter>>>;
  _not?: InputMaybe<AccountsListFilter>;
  _or?: InputMaybe<Array<InputMaybe<AccountsListFilter>>>;
  code?: InputMaybe<Scalars['String']['input']>;
  code_gt?: InputMaybe<Scalars['String']['input']>;
  code_gte?: InputMaybe<Scalars['String']['input']>;
  code_ilike?: InputMaybe<Scalars['String']['input']>;
  code_in?: InputMaybe<Array<Scalars['String']['input']>>;
  code_like?: InputMaybe<Scalars['String']['input']>;
  code_lt?: InputMaybe<Scalars['String']['input']>;
  code_lte?: InputMaybe<Scalars['String']['input']>;
  code_ne?: InputMaybe<Scalars['String']['input']>;
  code_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  code_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  code_null?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_ne?: InputMaybe<Scalars['ID']['input']>;
  id_nin?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  id_null?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_ilike?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_ne?: InputMaybe<Scalars['String']['input']>;
  name_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  name_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  name_null?: InputMaybe<Scalars['Boolean']['input']>;
  tenant?: InputMaybe<TenantsListFilter>;
  tenantId?: InputMaybe<Scalars['String']['input']>;
  tenantId_gt?: InputMaybe<Scalars['String']['input']>;
  tenantId_gte?: InputMaybe<Scalars['String']['input']>;
  tenantId_ilike?: InputMaybe<Scalars['String']['input']>;
  tenantId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tenantId_like?: InputMaybe<Scalars['String']['input']>;
  tenantId_lt?: InputMaybe<Scalars['String']['input']>;
  tenantId_lte?: InputMaybe<Scalars['String']['input']>;
  tenantId_ne?: InputMaybe<Scalars['String']['input']>;
  tenantId_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  tenantId_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  tenantId_null?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<AccountType>;
  type_in?: InputMaybe<Array<AccountType>>;
  type_nin?: InputMaybe<Array<AccountType>>;
};

export type AccountsOrderByInput = {
  code?: InputMaybe<Sort>;
  id?: InputMaybe<Sort>;
  name?: InputMaybe<Sort>;
  tenantId?: InputMaybe<Sort>;
  type?: InputMaybe<Sort>;
};

/** Pagination options for Accounts. */
export type AccountsPaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AccountsOrderByInput>;
};

export type AdminUiEntityAttributeMetadata = {
  __typename?: 'AdminUiEntityAttributeMetadata';
  clientGeneratedPrimaryKeys?: Maybe<Scalars['Boolean']['output']>;
  exportPageSize?: Maybe<Scalars['Float']['output']>;
  isReadOnly?: Maybe<Scalars['Boolean']['output']>;
};

export type AdminUiEntityMetadata = {
  __typename?: 'AdminUiEntityMetadata';
  attributes: AdminUiEntityAttributeMetadata;
  backendDisplayName?: Maybe<Scalars['String']['output']>;
  backendId?: Maybe<Scalars['String']['output']>;
  defaultFilter?: Maybe<Scalars['JSON']['output']>;
  defaultSort?: Maybe<Scalars['JSON']['output']>;
  excludeFromTracing: Scalars['Boolean']['output'];
  fieldForDetailPanelNavigationId: Scalars['String']['output'];
  fields: Array<AdminUiFieldMetadata>;
  hideInSideBar: Scalars['Boolean']['output'];
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
  hideInDetailForm?: Maybe<Scalars['Boolean']['output']>;
  hideInFilterBar?: Maybe<Scalars['Boolean']['output']>;
  hideInTable?: Maybe<Scalars['Boolean']['output']>;
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

export type AggregationResult = {
  __typename?: 'AggregationResult';
  count: Scalars['Int']['output'];
};

export enum AggregationType {
  Count = 'COUNT'
}

export type DeleteOneFilterInput = {
  id: Scalars['ID']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a single Account. */
  createAccount?: Maybe<Account>;
  /** Create many Accounts. */
  createAccounts?: Maybe<Array<Maybe<Account>>>;
  /** Create or update many Accounts. */
  createOrUpdateAccounts?: Maybe<Array<Maybe<Account>>>;
  /** Create or update many ProfitAndLossRows. */
  createOrUpdateProfitAndLossRows?: Maybe<Array<Maybe<ProfitAndLossRow>>>;
  /** Create or update many Tenants. */
  createOrUpdateTenants?: Maybe<Array<Maybe<Tenant>>>;
  /** Create a single ProfitAndLossRow. */
  createProfitAndLossRow?: Maybe<ProfitAndLossRow>;
  /** Create many ProfitAndLossRows. */
  createProfitAndLossRows?: Maybe<Array<Maybe<ProfitAndLossRow>>>;
  /** Create a single Tenant. */
  createTenant?: Maybe<Tenant>;
  /** Create many Tenants. */
  createTenants?: Maybe<Array<Maybe<Tenant>>>;
  /** Delete a single Account. */
  deleteAccount?: Maybe<Scalars['Boolean']['output']>;
  /** Delete many Accounts with a filter. */
  deleteAccounts?: Maybe<Scalars['Boolean']['output']>;
  /** Delete a single ProfitAndLossRow. */
  deleteProfitAndLossRow?: Maybe<Scalars['Boolean']['output']>;
  /** Delete many ProfitAndLossRows with a filter. */
  deleteProfitAndLossRows?: Maybe<Scalars['Boolean']['output']>;
  /** Delete a single Tenant. */
  deleteTenant?: Maybe<Scalars['Boolean']['output']>;
  /** Delete many Tenants with a filter. */
  deleteTenants?: Maybe<Scalars['Boolean']['output']>;
  /** Update a single Account. */
  updateAccount?: Maybe<Account>;
  /** Update many Accounts. */
  updateAccounts?: Maybe<Array<Maybe<Account>>>;
  /** Update a single ProfitAndLossRow. */
  updateProfitAndLossRow?: Maybe<ProfitAndLossRow>;
  /** Update many ProfitAndLossRows. */
  updateProfitAndLossRows?: Maybe<Array<Maybe<ProfitAndLossRow>>>;
  /** Update a single Tenant. */
  updateTenant?: Maybe<Tenant>;
  /** Update many Tenants. */
  updateTenants?: Maybe<Array<Maybe<Tenant>>>;
};


export type MutationCreateAccountArgs = {
  input: AccountInsertInput;
};


export type MutationCreateAccountsArgs = {
  input: Array<AccountInsertInput>;
};


export type MutationCreateOrUpdateAccountsArgs = {
  input: Array<AccountCreateOrUpdateInput>;
};


export type MutationCreateOrUpdateProfitAndLossRowsArgs = {
  input: Array<ProfitAndLossRowCreateOrUpdateInput>;
};


export type MutationCreateOrUpdateTenantsArgs = {
  input: Array<TenantCreateOrUpdateInput>;
};


export type MutationCreateProfitAndLossRowArgs = {
  input: ProfitAndLossRowInsertInput;
};


export type MutationCreateProfitAndLossRowsArgs = {
  input: Array<ProfitAndLossRowInsertInput>;
};


export type MutationCreateTenantArgs = {
  input: TenantInsertInput;
};


export type MutationCreateTenantsArgs = {
  input: Array<TenantInsertInput>;
};


export type MutationDeleteAccountArgs = {
  filter: DeleteOneFilterInput;
};


export type MutationDeleteAccountsArgs = {
  filter: AccountsListFilter;
};


export type MutationDeleteProfitAndLossRowArgs = {
  filter: DeleteOneFilterInput;
};


export type MutationDeleteProfitAndLossRowsArgs = {
  filter: ProfitAndLossRowsListFilter;
};


export type MutationDeleteTenantArgs = {
  filter: DeleteOneFilterInput;
};


export type MutationDeleteTenantsArgs = {
  filter: TenantsListFilter;
};


export type MutationUpdateAccountArgs = {
  input: AccountUpdateInput;
};


export type MutationUpdateAccountsArgs = {
  input: Array<AccountUpdateInput>;
};


export type MutationUpdateProfitAndLossRowArgs = {
  input: ProfitAndLossRowUpdateInput;
};


export type MutationUpdateProfitAndLossRowsArgs = {
  input: Array<ProfitAndLossRowUpdateInput>;
};


export type MutationUpdateTenantArgs = {
  input: TenantUpdateInput;
};


export type MutationUpdateTenantsArgs = {
  input: Array<TenantUpdateInput>;
};

export type ProfitAndLossRow = {
  __typename?: 'ProfitAndLossRow';
  account?: Maybe<Account>;
  accountId?: Maybe<Scalars['ID']['output']>;
  amount: Scalars['Float']['output'];
  date: Scalars['ISOString']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  tenant: Tenant;
  tenantId?: Maybe<Scalars['ID']['output']>;
};

/** Data needed to create or update ProfitAndLossRows. If an ID is passed, this is an update, otherwise it's an insert. */
export type ProfitAndLossRowCreateOrUpdateInput = {
  account?: InputMaybe<AccountCreateOrUpdateInput>;
  accountId?: InputMaybe<Scalars['ID']['input']>;
  amount?: InputMaybe<Scalars['Float']['input']>;
  date?: InputMaybe<Scalars['ISOString']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  tenant?: InputMaybe<TenantCreateOrUpdateInput>;
  tenantId?: InputMaybe<Scalars['ID']['input']>;
};

/** Data needed to create ProfitAndLossRows. */
export type ProfitAndLossRowInsertInput = {
  account?: InputMaybe<AccountCreateOrUpdateInput>;
  accountId?: InputMaybe<Scalars['ID']['input']>;
  amount: Scalars['Float']['input'];
  date: Scalars['ISOString']['input'];
  description: Scalars['String']['input'];
  tenant?: InputMaybe<TenantCreateOrUpdateInput>;
  tenantId?: InputMaybe<Scalars['ID']['input']>;
};

/** Data needed to update ProfitAndLossRows. An ID must be passed. */
export type ProfitAndLossRowUpdateInput = {
  account?: InputMaybe<AccountCreateOrUpdateInput>;
  accountId?: InputMaybe<Scalars['ID']['input']>;
  amount?: InputMaybe<Scalars['Float']['input']>;
  date?: InputMaybe<Scalars['ISOString']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  tenant?: InputMaybe<TenantCreateOrUpdateInput>;
  tenantId?: InputMaybe<Scalars['ID']['input']>;
};

export type ProfitAndLossRowsListFilter = {
  _and?: InputMaybe<Array<InputMaybe<ProfitAndLossRowsListFilter>>>;
  _not?: InputMaybe<ProfitAndLossRowsListFilter>;
  _or?: InputMaybe<Array<InputMaybe<ProfitAndLossRowsListFilter>>>;
  account?: InputMaybe<AccountsListFilter>;
  accountId?: InputMaybe<Scalars['ID']['input']>;
  accountId_gt?: InputMaybe<Scalars['ID']['input']>;
  accountId_gte?: InputMaybe<Scalars['ID']['input']>;
  accountId_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  accountId_lt?: InputMaybe<Scalars['ID']['input']>;
  accountId_lte?: InputMaybe<Scalars['ID']['input']>;
  accountId_ne?: InputMaybe<Scalars['ID']['input']>;
  accountId_nin?: InputMaybe<Array<Scalars['ID']['input']>>;
  accountId_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  accountId_null?: InputMaybe<Scalars['Boolean']['input']>;
  amount?: InputMaybe<Scalars['Float']['input']>;
  amount_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  amount_ne?: InputMaybe<Scalars['Float']['input']>;
  amount_nin?: InputMaybe<Array<Scalars['Float']['input']>>;
  amount_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_null?: InputMaybe<Scalars['Boolean']['input']>;
  date?: InputMaybe<Scalars['ISOString']['input']>;
  date_gt?: InputMaybe<Scalars['ISOString']['input']>;
  date_gte?: InputMaybe<Scalars['ISOString']['input']>;
  date_in?: InputMaybe<Array<Scalars['ISOString']['input']>>;
  date_lt?: InputMaybe<Scalars['ISOString']['input']>;
  date_lte?: InputMaybe<Scalars['ISOString']['input']>;
  date_ne?: InputMaybe<Scalars['ISOString']['input']>;
  date_nin?: InputMaybe<Array<Scalars['ISOString']['input']>>;
  date_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  date_null?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_gt?: InputMaybe<Scalars['String']['input']>;
  description_gte?: InputMaybe<Scalars['String']['input']>;
  description_ilike?: InputMaybe<Scalars['String']['input']>;
  description_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_like?: InputMaybe<Scalars['String']['input']>;
  description_lt?: InputMaybe<Scalars['String']['input']>;
  description_lte?: InputMaybe<Scalars['String']['input']>;
  description_ne?: InputMaybe<Scalars['String']['input']>;
  description_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  description_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  description_null?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_ne?: InputMaybe<Scalars['ID']['input']>;
  id_nin?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  id_null?: InputMaybe<Scalars['Boolean']['input']>;
  tenant?: InputMaybe<TenantsListFilter>;
  tenantId?: InputMaybe<Scalars['ID']['input']>;
  tenantId_gt?: InputMaybe<Scalars['ID']['input']>;
  tenantId_gte?: InputMaybe<Scalars['ID']['input']>;
  tenantId_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  tenantId_lt?: InputMaybe<Scalars['ID']['input']>;
  tenantId_lte?: InputMaybe<Scalars['ID']['input']>;
  tenantId_ne?: InputMaybe<Scalars['ID']['input']>;
  tenantId_nin?: InputMaybe<Array<Scalars['ID']['input']>>;
  tenantId_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  tenantId_null?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ProfitAndLossRowsOrderByInput = {
  accountId?: InputMaybe<Sort>;
  amount?: InputMaybe<Sort>;
  date?: InputMaybe<Sort>;
  description?: InputMaybe<Sort>;
  id?: InputMaybe<Sort>;
  tenantId?: InputMaybe<Sort>;
};

/** Pagination options for ProfitAndLossRows. */
export type ProfitAndLossRowsPaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProfitAndLossRowsOrderByInput>;
};

export type Query = {
  __typename?: 'Query';
  /** Query used by the Admin UI to introspect the schema and metadata. */
  _graphweaver?: Maybe<AdminUiMetadata>;
  /** Get a single Account. */
  account?: Maybe<Account>;
  /** Get multiple Accounts. */
  accounts?: Maybe<Array<Maybe<Account>>>;
  /** Get a single ProfitAndLossRow. */
  profitAndLossRow?: Maybe<ProfitAndLossRow>;
  /** Get multiple ProfitAndLossRows. */
  profitAndLossRows?: Maybe<Array<Maybe<ProfitAndLossRow>>>;
  /** Get a single Tenant. */
  tenant?: Maybe<Tenant>;
  /** Get multiple Tenants. */
  tenants?: Maybe<Array<Maybe<Tenant>>>;
};


export type QueryAccountArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAccountsArgs = {
  filter?: InputMaybe<AccountsListFilter>;
  pagination?: InputMaybe<AccountsPaginationInput>;
};


export type QueryProfitAndLossRowArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProfitAndLossRowsArgs = {
  filter?: InputMaybe<ProfitAndLossRowsListFilter>;
  pagination?: InputMaybe<ProfitAndLossRowsPaginationInput>;
};


export type QueryTenantArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTenantsArgs = {
  filter?: InputMaybe<TenantsListFilter>;
  pagination?: InputMaybe<TenantsPaginationInput>;
};

export enum Sort {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Tenant = {
  __typename?: 'Tenant';
  authEventId: Scalars['String']['output'];
  createdDateUtc: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  tenantName: Scalars['String']['output'];
  tenantType: Scalars['String']['output'];
  updatedDateUtc: Scalars['String']['output'];
};

/** Data needed to create or update Tenants. If an ID is passed, this is an update, otherwise it's an insert. */
export type TenantCreateOrUpdateInput = {
  authEventId?: InputMaybe<Scalars['String']['input']>;
  createdDateUtc?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  tenantName?: InputMaybe<Scalars['String']['input']>;
  tenantType?: InputMaybe<Scalars['String']['input']>;
  updatedDateUtc?: InputMaybe<Scalars['String']['input']>;
};

/** Data needed to create Tenants. */
export type TenantInsertInput = {
  authEventId: Scalars['String']['input'];
  createdDateUtc: Scalars['String']['input'];
  tenantName: Scalars['String']['input'];
  tenantType: Scalars['String']['input'];
  updatedDateUtc: Scalars['String']['input'];
};

/** Data needed to update Tenants. An ID must be passed. */
export type TenantUpdateInput = {
  authEventId?: InputMaybe<Scalars['String']['input']>;
  createdDateUtc?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  tenantName?: InputMaybe<Scalars['String']['input']>;
  tenantType?: InputMaybe<Scalars['String']['input']>;
  updatedDateUtc?: InputMaybe<Scalars['String']['input']>;
};

export type TenantsListFilter = {
  _and?: InputMaybe<Array<InputMaybe<TenantsListFilter>>>;
  _not?: InputMaybe<TenantsListFilter>;
  _or?: InputMaybe<Array<InputMaybe<TenantsListFilter>>>;
  authEventId?: InputMaybe<Scalars['String']['input']>;
  authEventId_gt?: InputMaybe<Scalars['String']['input']>;
  authEventId_gte?: InputMaybe<Scalars['String']['input']>;
  authEventId_ilike?: InputMaybe<Scalars['String']['input']>;
  authEventId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  authEventId_like?: InputMaybe<Scalars['String']['input']>;
  authEventId_lt?: InputMaybe<Scalars['String']['input']>;
  authEventId_lte?: InputMaybe<Scalars['String']['input']>;
  authEventId_ne?: InputMaybe<Scalars['String']['input']>;
  authEventId_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  authEventId_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  authEventId_null?: InputMaybe<Scalars['Boolean']['input']>;
  createdDateUtc?: InputMaybe<Scalars['String']['input']>;
  createdDateUtc_gt?: InputMaybe<Scalars['String']['input']>;
  createdDateUtc_gte?: InputMaybe<Scalars['String']['input']>;
  createdDateUtc_ilike?: InputMaybe<Scalars['String']['input']>;
  createdDateUtc_in?: InputMaybe<Array<Scalars['String']['input']>>;
  createdDateUtc_like?: InputMaybe<Scalars['String']['input']>;
  createdDateUtc_lt?: InputMaybe<Scalars['String']['input']>;
  createdDateUtc_lte?: InputMaybe<Scalars['String']['input']>;
  createdDateUtc_ne?: InputMaybe<Scalars['String']['input']>;
  createdDateUtc_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  createdDateUtc_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  createdDateUtc_null?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_ne?: InputMaybe<Scalars['ID']['input']>;
  id_nin?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  id_null?: InputMaybe<Scalars['Boolean']['input']>;
  tenantName?: InputMaybe<Scalars['String']['input']>;
  tenantName_gt?: InputMaybe<Scalars['String']['input']>;
  tenantName_gte?: InputMaybe<Scalars['String']['input']>;
  tenantName_ilike?: InputMaybe<Scalars['String']['input']>;
  tenantName_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tenantName_like?: InputMaybe<Scalars['String']['input']>;
  tenantName_lt?: InputMaybe<Scalars['String']['input']>;
  tenantName_lte?: InputMaybe<Scalars['String']['input']>;
  tenantName_ne?: InputMaybe<Scalars['String']['input']>;
  tenantName_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  tenantName_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  tenantName_null?: InputMaybe<Scalars['Boolean']['input']>;
  tenantType?: InputMaybe<Scalars['String']['input']>;
  tenantType_gt?: InputMaybe<Scalars['String']['input']>;
  tenantType_gte?: InputMaybe<Scalars['String']['input']>;
  tenantType_ilike?: InputMaybe<Scalars['String']['input']>;
  tenantType_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tenantType_like?: InputMaybe<Scalars['String']['input']>;
  tenantType_lt?: InputMaybe<Scalars['String']['input']>;
  tenantType_lte?: InputMaybe<Scalars['String']['input']>;
  tenantType_ne?: InputMaybe<Scalars['String']['input']>;
  tenantType_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  tenantType_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  tenantType_null?: InputMaybe<Scalars['Boolean']['input']>;
  updatedDateUtc?: InputMaybe<Scalars['String']['input']>;
  updatedDateUtc_gt?: InputMaybe<Scalars['String']['input']>;
  updatedDateUtc_gte?: InputMaybe<Scalars['String']['input']>;
  updatedDateUtc_ilike?: InputMaybe<Scalars['String']['input']>;
  updatedDateUtc_in?: InputMaybe<Array<Scalars['String']['input']>>;
  updatedDateUtc_like?: InputMaybe<Scalars['String']['input']>;
  updatedDateUtc_lt?: InputMaybe<Scalars['String']['input']>;
  updatedDateUtc_lte?: InputMaybe<Scalars['String']['input']>;
  updatedDateUtc_ne?: InputMaybe<Scalars['String']['input']>;
  updatedDateUtc_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  updatedDateUtc_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  updatedDateUtc_null?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TenantsOrderByInput = {
  authEventId?: InputMaybe<Sort>;
  createdDateUtc?: InputMaybe<Sort>;
  id?: InputMaybe<Sort>;
  tenantName?: InputMaybe<Sort>;
  tenantType?: InputMaybe<Sort>;
  updatedDateUtc?: InputMaybe<Sort>;
};

/** Pagination options for Tenants. */
export type TenantsPaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TenantsOrderByInput>;
};
