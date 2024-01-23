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
};

export type AdminUiEntityAttributeMetadata = {
  __typename?: 'AdminUiEntityAttributeMetadata';
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

export type AdminUiFieldMetadata = {
  __typename?: 'AdminUiFieldMetadata';
  attributes?: Maybe<AdminUiFieldAttributeMetadata>;
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

export type Event = {
  __typename?: 'Event';
  address?: Maybe<Scalars['String']['output']>;
  changed: Scalars['String']['output'];
  contactName?: Maybe<Scalars['String']['output']>;
  contactUrl: Scalars['String']['output'];
  created: Scalars['String']['output'];
  eventEnd?: Maybe<Scalars['String']['output']>;
  eventStart: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isFree: Scalars['Boolean']['output'];
  latitude?: Maybe<Scalars['String']['output']>;
  longitude?: Maybe<Scalars['String']['output']>;
  place?: Maybe<Scalars['String']['output']>;
  published?: Maybe<Scalars['String']['output']>;
  status: EventStatus;
  summary: Scalars['String']['output'];
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type EventCreateOrUpdateInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  changed?: InputMaybe<Scalars['String']['input']>;
  contactName?: InputMaybe<Scalars['String']['input']>;
  contactUrl?: InputMaybe<Scalars['String']['input']>;
  created?: InputMaybe<Scalars['String']['input']>;
  eventEnd?: InputMaybe<Scalars['String']['input']>;
  eventStart?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  isFree?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['String']['input']>;
  place?: InputMaybe<Scalars['String']['input']>;
  published?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<EventStatus>;
  summary?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type EventInsertInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  changed: Scalars['String']['input'];
  contactName?: InputMaybe<Scalars['String']['input']>;
  contactUrl: Scalars['String']['input'];
  created: Scalars['String']['input'];
  eventEnd?: InputMaybe<Scalars['String']['input']>;
  eventStart: Scalars['String']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  isFree?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['String']['input']>;
  place?: InputMaybe<Scalars['String']['input']>;
  published?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<EventStatus>;
  summary: Scalars['String']['input'];
  title: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

/** Status of the event */
export enum EventStatus {
  Canceled = 'Canceled',
  Completed = 'Completed',
  Draft = 'Draft',
  Ended = 'Ended',
  Live = 'Live',
  Started = 'Started'
}

export type EventbriteOrder = {
  __typename?: 'EventbriteOrder';
  email: Scalars['String']['output'];
  event?: Maybe<Event>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  status: Scalars['String']['output'];
};


export type EventbriteOrderEventArgs = {
  filter?: InputMaybe<EventsListFilter>;
};

export type EventbriteOrderCreateOrUpdateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  event?: InputMaybe<EventCreateOrUpdateInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type EventbriteOrderInsertInput = {
  email: Scalars['String']['input'];
  event?: InputMaybe<EventCreateOrUpdateInput>;
  name: Scalars['String']['input'];
  status: Scalars['String']['input'];
};

export type EventbriteOrdersCreateOrUpdateManyInput = {
  data: Array<EventbriteOrderCreateOrUpdateInput>;
};

export type EventbriteOrdersInsertManyInput = {
  data: Array<EventbriteOrderInsertInput>;
};

export type EventbriteOrdersListFilter = {
  _and?: InputMaybe<Array<EventbriteOrdersListFilter>>;
  _not?: InputMaybe<EventbriteOrdersListFilter>;
  _or?: InputMaybe<Array<EventbriteOrdersListFilter>>;
  email?: InputMaybe<Scalars['String']['input']>;
  email_ilike?: InputMaybe<Scalars['String']['input']>;
  email_in?: InputMaybe<Array<Scalars['String']['input']>>;
  email_like?: InputMaybe<Scalars['String']['input']>;
  email_ne?: InputMaybe<Scalars['String']['input']>;
  email_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  email_notnull?: InputMaybe<Scalars['String']['input']>;
  email_null?: InputMaybe<Scalars['String']['input']>;
  event?: InputMaybe<EventsListFilter>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_ne?: InputMaybe<Scalars['ID']['input']>;
  id_nin?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_notnull?: InputMaybe<Scalars['ID']['input']>;
  id_null?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_ilike?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  name_ne?: InputMaybe<Scalars['String']['input']>;
  name_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  name_notnull?: InputMaybe<Scalars['String']['input']>;
  name_null?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  status_ilike?: InputMaybe<Scalars['String']['input']>;
  status_in?: InputMaybe<Array<Scalars['String']['input']>>;
  status_like?: InputMaybe<Scalars['String']['input']>;
  status_ne?: InputMaybe<Scalars['String']['input']>;
  status_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  status_notnull?: InputMaybe<Scalars['String']['input']>;
  status_null?: InputMaybe<Scalars['String']['input']>;
};

export type EventbriteOrdersOrderByInput = {
  email?: InputMaybe<Sort>;
  id?: InputMaybe<Sort>;
  name?: InputMaybe<Sort>;
  status?: InputMaybe<Sort>;
};

export type EventbriteOrdersPaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<EventbriteOrdersOrderByInput>;
};

export type EventbriteOrdersUpdateManyInput = {
  data: Array<EventbriteOrderCreateOrUpdateInput>;
};

export type EventsCreateOrUpdateManyInput = {
  data: Array<EventCreateOrUpdateInput>;
};

export type EventsInsertManyInput = {
  data: Array<EventInsertInput>;
};

export type EventsListFilter = {
  _and?: InputMaybe<Array<EventsListFilter>>;
  _not?: InputMaybe<EventsListFilter>;
  _or?: InputMaybe<Array<EventsListFilter>>;
  address?: InputMaybe<Scalars['String']['input']>;
  address_ilike?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_like?: InputMaybe<Scalars['String']['input']>;
  address_ne?: InputMaybe<Scalars['String']['input']>;
  address_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  address_notnull?: InputMaybe<Scalars['String']['input']>;
  address_null?: InputMaybe<Scalars['String']['input']>;
  changed?: InputMaybe<Scalars['String']['input']>;
  changed_ilike?: InputMaybe<Scalars['String']['input']>;
  changed_in?: InputMaybe<Array<Scalars['String']['input']>>;
  changed_like?: InputMaybe<Scalars['String']['input']>;
  changed_ne?: InputMaybe<Scalars['String']['input']>;
  changed_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  changed_notnull?: InputMaybe<Scalars['String']['input']>;
  changed_null?: InputMaybe<Scalars['String']['input']>;
  contactName?: InputMaybe<Scalars['String']['input']>;
  contactName_ilike?: InputMaybe<Scalars['String']['input']>;
  contactName_in?: InputMaybe<Array<Scalars['String']['input']>>;
  contactName_like?: InputMaybe<Scalars['String']['input']>;
  contactName_ne?: InputMaybe<Scalars['String']['input']>;
  contactName_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  contactName_notnull?: InputMaybe<Scalars['String']['input']>;
  contactName_null?: InputMaybe<Scalars['String']['input']>;
  contactUrl?: InputMaybe<Scalars['String']['input']>;
  contactUrl_ilike?: InputMaybe<Scalars['String']['input']>;
  contactUrl_in?: InputMaybe<Array<Scalars['String']['input']>>;
  contactUrl_like?: InputMaybe<Scalars['String']['input']>;
  contactUrl_ne?: InputMaybe<Scalars['String']['input']>;
  contactUrl_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  contactUrl_notnull?: InputMaybe<Scalars['String']['input']>;
  contactUrl_null?: InputMaybe<Scalars['String']['input']>;
  created?: InputMaybe<Scalars['String']['input']>;
  created_ilike?: InputMaybe<Scalars['String']['input']>;
  created_in?: InputMaybe<Array<Scalars['String']['input']>>;
  created_like?: InputMaybe<Scalars['String']['input']>;
  created_ne?: InputMaybe<Scalars['String']['input']>;
  created_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  created_notnull?: InputMaybe<Scalars['String']['input']>;
  created_null?: InputMaybe<Scalars['String']['input']>;
  eventEnd?: InputMaybe<Scalars['String']['input']>;
  eventEnd_ilike?: InputMaybe<Scalars['String']['input']>;
  eventEnd_in?: InputMaybe<Array<Scalars['String']['input']>>;
  eventEnd_like?: InputMaybe<Scalars['String']['input']>;
  eventEnd_ne?: InputMaybe<Scalars['String']['input']>;
  eventEnd_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  eventEnd_notnull?: InputMaybe<Scalars['String']['input']>;
  eventEnd_null?: InputMaybe<Scalars['String']['input']>;
  eventStart?: InputMaybe<Scalars['String']['input']>;
  eventStart_ilike?: InputMaybe<Scalars['String']['input']>;
  eventStart_in?: InputMaybe<Array<Scalars['String']['input']>>;
  eventStart_like?: InputMaybe<Scalars['String']['input']>;
  eventStart_ne?: InputMaybe<Scalars['String']['input']>;
  eventStart_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  eventStart_notnull?: InputMaybe<Scalars['String']['input']>;
  eventStart_null?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_ne?: InputMaybe<Scalars['ID']['input']>;
  id_nin?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_notnull?: InputMaybe<Scalars['ID']['input']>;
  id_null?: InputMaybe<Scalars['ID']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  imageUrl_ilike?: InputMaybe<Scalars['String']['input']>;
  imageUrl_in?: InputMaybe<Array<Scalars['String']['input']>>;
  imageUrl_like?: InputMaybe<Scalars['String']['input']>;
  imageUrl_ne?: InputMaybe<Scalars['String']['input']>;
  imageUrl_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  imageUrl_notnull?: InputMaybe<Scalars['String']['input']>;
  imageUrl_null?: InputMaybe<Scalars['String']['input']>;
  isFree?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['String']['input']>;
  latitude_ilike?: InputMaybe<Scalars['String']['input']>;
  latitude_in?: InputMaybe<Array<Scalars['String']['input']>>;
  latitude_like?: InputMaybe<Scalars['String']['input']>;
  latitude_ne?: InputMaybe<Scalars['String']['input']>;
  latitude_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  latitude_notnull?: InputMaybe<Scalars['String']['input']>;
  latitude_null?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['String']['input']>;
  longitude_ilike?: InputMaybe<Scalars['String']['input']>;
  longitude_in?: InputMaybe<Array<Scalars['String']['input']>>;
  longitude_like?: InputMaybe<Scalars['String']['input']>;
  longitude_ne?: InputMaybe<Scalars['String']['input']>;
  longitude_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  longitude_notnull?: InputMaybe<Scalars['String']['input']>;
  longitude_null?: InputMaybe<Scalars['String']['input']>;
  place?: InputMaybe<Scalars['String']['input']>;
  place_ilike?: InputMaybe<Scalars['String']['input']>;
  place_in?: InputMaybe<Array<Scalars['String']['input']>>;
  place_like?: InputMaybe<Scalars['String']['input']>;
  place_ne?: InputMaybe<Scalars['String']['input']>;
  place_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  place_notnull?: InputMaybe<Scalars['String']['input']>;
  place_null?: InputMaybe<Scalars['String']['input']>;
  published?: InputMaybe<Scalars['String']['input']>;
  published_ilike?: InputMaybe<Scalars['String']['input']>;
  published_in?: InputMaybe<Array<Scalars['String']['input']>>;
  published_like?: InputMaybe<Scalars['String']['input']>;
  published_ne?: InputMaybe<Scalars['String']['input']>;
  published_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  published_notnull?: InputMaybe<Scalars['String']['input']>;
  published_null?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<EventStatus>;
  status_in?: InputMaybe<Array<EventStatus>>;
  status_ne?: InputMaybe<EventStatus>;
  status_nin?: InputMaybe<Array<EventStatus>>;
  status_notnull?: InputMaybe<EventStatus>;
  status_null?: InputMaybe<EventStatus>;
  summary?: InputMaybe<Scalars['String']['input']>;
  summary_ilike?: InputMaybe<Scalars['String']['input']>;
  summary_in?: InputMaybe<Array<Scalars['String']['input']>>;
  summary_like?: InputMaybe<Scalars['String']['input']>;
  summary_ne?: InputMaybe<Scalars['String']['input']>;
  summary_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  summary_notnull?: InputMaybe<Scalars['String']['input']>;
  summary_null?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_ilike?: InputMaybe<Scalars['String']['input']>;
  title_in?: InputMaybe<Array<Scalars['String']['input']>>;
  title_like?: InputMaybe<Scalars['String']['input']>;
  title_ne?: InputMaybe<Scalars['String']['input']>;
  title_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  title_notnull?: InputMaybe<Scalars['String']['input']>;
  title_null?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  url_ilike?: InputMaybe<Scalars['String']['input']>;
  url_in?: InputMaybe<Array<Scalars['String']['input']>>;
  url_like?: InputMaybe<Scalars['String']['input']>;
  url_ne?: InputMaybe<Scalars['String']['input']>;
  url_nin?: InputMaybe<Array<Scalars['String']['input']>>;
  url_notnull?: InputMaybe<Scalars['String']['input']>;
  url_null?: InputMaybe<Scalars['String']['input']>;
};

export type EventsOrderByInput = {
  address?: InputMaybe<Sort>;
  changed?: InputMaybe<Sort>;
  contactName?: InputMaybe<Sort>;
  contactUrl?: InputMaybe<Sort>;
  created?: InputMaybe<Sort>;
  eventEnd?: InputMaybe<Sort>;
  eventStart?: InputMaybe<Sort>;
  id?: InputMaybe<Sort>;
  imageUrl?: InputMaybe<Sort>;
  latitude?: InputMaybe<Sort>;
  longitude?: InputMaybe<Sort>;
  place?: InputMaybe<Sort>;
  published?: InputMaybe<Sort>;
  status?: InputMaybe<Sort>;
  summary?: InputMaybe<Sort>;
  title?: InputMaybe<Sort>;
  url?: InputMaybe<Sort>;
};

export type EventsPaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<EventsOrderByInput>;
};

export type EventsUpdateManyInput = {
  data: Array<EventCreateOrUpdateInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createEvent: Event;
  createEventbriteOrder: EventbriteOrder;
  createEventbriteOrders: Array<EventbriteOrder>;
  createEvents: Array<Event>;
  createOrUpdateEventbriteOrders: Array<EventbriteOrder>;
  createOrUpdateEvents: Array<Event>;
  deleteEvent: Scalars['Boolean']['output'];
  deleteEventbriteOrder: Scalars['Boolean']['output'];
  updateEvent: Event;
  updateEventbriteOrder: EventbriteOrder;
  updateEventbriteOrders: Array<EventbriteOrder>;
  updateEvents: Array<Event>;
};


export type MutationCreateEventArgs = {
  data: EventInsertInput;
};


export type MutationCreateEventbriteOrderArgs = {
  data: EventbriteOrderInsertInput;
};


export type MutationCreateEventbriteOrdersArgs = {
  input: EventbriteOrdersInsertManyInput;
};


export type MutationCreateEventsArgs = {
  input: EventsInsertManyInput;
};


export type MutationCreateOrUpdateEventbriteOrdersArgs = {
  input: EventbriteOrdersCreateOrUpdateManyInput;
};


export type MutationCreateOrUpdateEventsArgs = {
  input: EventsCreateOrUpdateManyInput;
};


export type MutationDeleteEventArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteEventbriteOrderArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateEventArgs = {
  data: EventCreateOrUpdateInput;
};


export type MutationUpdateEventbriteOrderArgs = {
  data: EventbriteOrderCreateOrUpdateInput;
};


export type MutationUpdateEventbriteOrdersArgs = {
  input: EventbriteOrdersUpdateManyInput;
};


export type MutationUpdateEventsArgs = {
  input: EventsUpdateManyInput;
};

export type Query = {
  __typename?: 'Query';
  _graphweaver: AdminUiMetadata;
  event?: Maybe<Event>;
  eventbriteOrder?: Maybe<EventbriteOrder>;
  eventbriteOrders: Array<EventbriteOrder>;
  events: Array<Event>;
};


export type QueryEventArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEventbriteOrderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEventbriteOrdersArgs = {
  filter?: InputMaybe<EventbriteOrdersListFilter>;
  pagination?: InputMaybe<EventbriteOrdersPaginationInput>;
};


export type QueryEventsArgs = {
  filter?: InputMaybe<EventsListFilter>;
  pagination?: InputMaybe<EventsPaginationInput>;
};

export enum Sort {
  Asc = 'ASC',
  Desc = 'DESC'
}