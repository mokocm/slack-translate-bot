import { Stack, Construct, StackProps } from '@aws-cdk/core';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { Runtime } from '@aws-cdk/aws-lambda';
import { LambdaRestApi } from '@aws-cdk/aws-apigateway';
import { PolicyStatement } from '@aws-cdk/aws-iam';
export class SlackTranslateBotStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambda = new NodejsFunction(this, 'lambda', {
      entry: 'lambda/app.ts',
      handler: 'handler',
      runtime: Runtime.NODEJS_12_X
    });

    lambda.addToRolePolicy(new PolicyStatement({ actions: ['translate:*'], resources: ['*'] }));

    const api = new LambdaRestApi(this, 'api', { handler: lambda });
  }
}
