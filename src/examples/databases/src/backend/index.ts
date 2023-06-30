import 'reflect-metadata';
import Graphweaver from '@exogee/graphweaver-apollo';
import { handlers, startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda';
import { ClearDatabaseContext, connectToDatabase } from '@exogee/graphweaver-mikroorm';

import { UserResolver } from './schema/user';
import { TaskResolver } from './schema/task';

import { connections } from './database';

const graphweaver = new Graphweaver({
	resolvers: [TaskResolver, UserResolver],
	apolloServerOptions: {
		plugins: [connectToDatabase(connections), ClearDatabaseContext],
	},
});

exports.handler = startServerAndCreateLambdaHandler(
	graphweaver.server,
	handlers.createAPIGatewayProxyEventRequestHandler()
);
