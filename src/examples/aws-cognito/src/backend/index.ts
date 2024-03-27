import 'reflect-metadata';
import Graphweaver from '@exogee/graphweaver-server';
import { AuthorizationContext } from '@exogee/graphweaver-auth';
import { createAwsCognitoUserResolver } from '@exogee/graphweaver-aws-cognito';

export const cognitoUser = createAwsCognitoUserResolver({
	userPoolId: process.env.COGNITO_USER_POOL_ID,
	region: process.env.AWS_REGION,
	endpoint: process.env.COGNITO_ENDPOINT,
});

export const graphweaver = new Graphweaver<AuthorizationContext>({
	resolvers: [cognitoUser.resolver],
});

export const handler = graphweaver.handler();
