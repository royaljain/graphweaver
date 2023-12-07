import 'reflect-metadata';
import Graphweaver from '@exogee/graphweaver-server';

import { eventbriteEvent, eventbriteOrder } from './schema';

const { EVENTBRITE_ACCESS_TOKEN, EVENTBRITE_ORG_ID } = process.env;
if (!EVENTBRITE_ACCESS_TOKEN) throw new Error('EVENTBRITE_ACCESS_TOKEN is required in environment');
if (!EVENTBRITE_ORG_ID) throw new Error('EVENTBRITE_ORG_ID is required in environment');

const resolvers = [eventbriteEvent, eventbriteOrder];

const graphweaver = new Graphweaver({
	resolvers,
});

exports.handler = graphweaver.handler();
