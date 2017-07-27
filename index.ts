import * as _ from 'lodash';
import { ServerlessInstance } from './types';

class ServerlessPlugin {
  private originalServicePath: string;

  serverless: ServerlessInstance;
  hooks: { [key: string]: Function };

  constructor(serverless: ServerlessInstance) {
    this.serverless = serverless;
    this.hooks = {
      'before:package:finalize': this.beforeDeploy.bind(this)
    };
  }

  async beforeDeploy(): Promise<void> {
    this.serverless.cli.log('Applying API Gateway Overrides');

    const apiGatewayOverrides = this.serverless.service.custom.apiGatewayOverrides;
    const template = this.serverless.service.provider.compiledCloudFormationTemplate;

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

    for (const resource of template.Resources) {
      this.serverless.cli.log(`resource type: ${resource.Type}`);
    }
  }
}

export default ServerlessPlugin;