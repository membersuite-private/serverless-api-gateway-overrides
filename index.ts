import * as _ from 'lodash';
import { ServerlessInstance } from './types';

class ServerlessPlugin {
  private originalServicePath: string;

  serverless: ServerlessInstance;
  hooks: { [key: string]: Function };

  constructor(serverless: ServerlessInstance) {
    this.serverless = serverless;
    this.hooks = {
      'after:package:initialize': this.afterInit.bind(this),
      'before:package:finalize': this.beforeDeploy.bind(this)
    };
  }

  async afterInit(): Promise<void> {
    const apiGatewayOverrides = this.serverless.service.custom.apiGatewayOverrides;
    const template = this.serverless.service.provider.compiledCloudFormationTemplate;
    const stage = this.serverless.service.provider.stage;

    this.serverless.cli.log('Applying Lambda Function Name Overrides');
    for (const prop in this.serverless.service.functions) {
      const func = this.serverless.service.functions[prop];
      if (func) {
        func.name = func.name.replace(`${stage}-`, '');
      }
    }
  }

  async beforeDeploy(): Promise<void> {
    const apiGatewayOverrides = this.serverless.service.custom.apiGatewayOverrides;
    const template = this.serverless.service.provider.compiledCloudFormationTemplate;

    this.serverless.cli.log('Applying API Gateway Overrides');
    _.extend(template.Resources,
      {
        ApiGatewayRestApi: {
          Type: 'AWS::ApiGateway::RestApi',
          Properties: {
            Name: apiGatewayOverrides.name
          }
        }
      }
    );
  }
}

export = ServerlessPlugin