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
};

export type AggregationResult = {
  __typename?: 'AggregationResult';
  count: Scalars['Int']['output'];
};

export enum AggregationType {
  Count = 'COUNT'
}

export type CaseStudy = {
  __typename?: 'CaseStudy';
  caseNumber: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
};

export type DeleteOneFilterInput = {
  id: Scalars['ID']['input'];
};

export type DeprecatedProduct = {
  __typename?: 'DeprecatedProduct';
  createdBy?: Maybe<User>;
  package: Scalars['String']['output'];
  reason?: Maybe<Scalars['String']['output']>;
  sku: Scalars['String']['output'];
};

export type DeprecatedProductsOrderByInput = {
  package?: InputMaybe<Sort>;
  reason?: InputMaybe<Sort>;
  sku?: InputMaybe<Sort>;
};

/** Pagination options for DeprecatedProducts. */
export type DeprecatedProductsPaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DeprecatedProductsOrderByInput>;
};

export type HiddenEntity = {
  __typename?: 'HiddenEntity';
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type InventoriesOrderByInput = {
  id?: InputMaybe<Sort>;
};

/** Pagination options for Inventories. */
export type InventoriesPaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoriesOrderByInput>;
};

export type Inventory = {
  __typename?: 'Inventory';
  deprecatedProducts?: Maybe<Array<DeprecatedProduct>>;
  id: Scalars['ID']['output'];
};

export type Product = {
  __typename?: 'Product';
  createdBy?: Maybe<User>;
  dimensions?: Maybe<ProductDimension>;
  hiddenEntities?: Maybe<Array<HiddenEntity>>;
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  package?: Maybe<Scalars['String']['output']>;
  research: Array<ProductResearch>;
  sku?: Maybe<Scalars['String']['output']>;
  variation?: Maybe<ProductVariation>;
};

export type ProductDimension = {
  __typename?: 'ProductDimension';
  size?: Maybe<Scalars['String']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
};

export type ProductDimensionsOrderByInput = {
  size?: InputMaybe<Sort>;
  unit?: InputMaybe<Sort>;
  weight?: InputMaybe<Sort>;
};

/** Pagination options for ProductDimensions. */
export type ProductDimensionsPaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductDimensionsOrderByInput>;
};

export type ProductResearch = {
  __typename?: 'ProductResearch';
  outcome?: Maybe<Scalars['String']['output']>;
  study: CaseStudy;
};

export type ProductResearchesOrderByInput = {
  outcome?: InputMaybe<Sort>;
};

/** Pagination options for ProductResearches. */
export type ProductResearchesPaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductResearchesOrderByInput>;
};

export type ProductVariation = {
  __typename?: 'ProductVariation';
  id: Scalars['ID']['output'];
};

export type ProductsListFilter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_ne?: InputMaybe<Scalars['ID']['input']>;
  id_nin?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  id_null?: InputMaybe<Scalars['Boolean']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  notes_ilike?: InputMaybe<Scalars['String']['input']>;
  notes_in?: InputMaybe<Array<Scalars['String']['input']>>;
  notes_like?: InputMaybe<Scalars['String']['input']>;
  notes_ne?: InputMaybe<Scalars['String']['input']>;
  notes_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  notes_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  notes_null?: InputMaybe<Scalars['Boolean']['input']>;
  package?: InputMaybe<Scalars['String']['input']>;
  package_ilike?: InputMaybe<Scalars['String']['input']>;
  package_in?: InputMaybe<Array<Scalars['String']['input']>>;
  package_like?: InputMaybe<Scalars['String']['input']>;
  package_ne?: InputMaybe<Scalars['String']['input']>;
  package_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  package_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  package_null?: InputMaybe<Scalars['Boolean']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  sku_ilike?: InputMaybe<Scalars['String']['input']>;
  sku_in?: InputMaybe<Array<Scalars['String']['input']>>;
  sku_like?: InputMaybe<Scalars['String']['input']>;
  sku_ne?: InputMaybe<Scalars['String']['input']>;
  sku_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  sku_notnull?: InputMaybe<Scalars['Boolean']['input']>;
  sku_null?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ProductsOrderByInput = {
  id?: InputMaybe<Sort>;
  notes?: InputMaybe<Sort>;
  package?: InputMaybe<Sort>;
  sku?: InputMaybe<Sort>;
};

/** Pagination options for Products. */
export type ProductsPaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderByInput>;
};

export type Query = {
  __typename?: 'Query';
  /** Union of all types in this subgraph. This information is needed by the Apollo federation gateway. */
  _entities: Array<Maybe<_Entity>>;
  /** Query used by the Admin UI to introspect the schema and metadata. */
  _graphweaver?: Maybe<AdminUiMetadata>;
  /** The sdl representing the federated service capabilities. Includes federation directives, removes federation types, and includes rest of full schema after schema directives have been applied. */
  _service?: Maybe<_Service>;
  deprecatedProduct?: Maybe<DeprecatedProduct>;
  /** Get a single Product. */
  product?: Maybe<Product>;
  /** Get multiple Products. */
  products?: Maybe<Array<Maybe<Product>>>;
};


export type Query_EntitiesArgs = {
  representations?: InputMaybe<Array<Scalars['_Any']['input']>>;
};


export type QueryDeprecatedProductArgs = {
  package: Scalars['String']['input'];
  sku: Scalars['String']['input'];
};


export type QueryProductArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProductsArgs = {
  filter?: InputMaybe<ProductsListFilter>;
  pagination?: InputMaybe<ProductsPaginationInput>;
};

export enum Sort {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type User = {
  __typename?: 'User';
  averageProductsCreatedPerYear?: Maybe<Scalars['Int']['output']>;
  email: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  totalProductsCreated?: Maybe<Scalars['Int']['output']>;
  yearsOfEmployment: Scalars['Int']['output'];
};

export type UsersOrderByInput = {
  averageProductsCreatedPerYear?: InputMaybe<Sort>;
  email?: InputMaybe<Sort>;
  name?: InputMaybe<Sort>;
  totalProductsCreated?: InputMaybe<Sort>;
  yearsOfEmployment?: InputMaybe<Sort>;
};

/** Pagination options for Users. */
export type UsersPaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UsersOrderByInput>;
};

export type _Entity = CaseStudy | DeprecatedProduct | Inventory | Product | ProductDimension | ProductResearch | ProductVariation | User;

export type _Service = {
  __typename?: '_service';
  sdl: Scalars['String']['output'];
};

export enum Link__Purpose {
  Execution = 'EXECUTION',
  Security = 'SECURITY'
}
