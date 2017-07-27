export interface ApiGatewayOverrides {
  name: string
}

export interface ServerlessPackage {
  include: string[]
  exclude: string[]
  artifact: string
}

export interface ServerlessFunction {
  handler: string
  package: ServerlessPackage
  name: string
}

export interface ServerlessOptions {
  function: string
  extraServicePath: string
}

export interface ServerlessTemplate {
  Resources: any
}

export interface ServerlessInstance {
  cli: {
    log(str: string)
  }
  config: {
    servicePath: string
  }
  service: {
    custom: {
      apiGatewayOverrides: ApiGatewayOverrides
    }
    functions: { [key: string]: ServerlessFunction }
    package: ServerlessPackage
    provider: {
      coreCloudFormationTemplate: ServerlessTemplate
      compiledCloudFormationTemplate: ServerlessTemplate
      environment: any
      region: string
      stage: string
    }
    getFunction: (name: string) => any
  }
}
