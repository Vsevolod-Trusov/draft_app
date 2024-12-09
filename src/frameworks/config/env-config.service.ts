import * as fs from 'fs';
import * as path from 'path';
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';

import { DependenciesNames, EnvFiles, NodeEnv } from 'data';
import * as dotenv from 'dotenv';
import { ConfigServiceActions, EnvConfigFile, EnvConfigOptions } from 'gateways';

@Injectable()
export class ConfigService implements ConfigServiceActions {
  private envConfig: EnvConfigFile;

  constructor(
    @Inject(DependenciesNames.EnvConfigOptions)
    private readonly options: EnvConfigOptions,
  ) {
    const { folder, envValidationSchema } = options;
    let filePath: string;

    switch (process.env.NODE_ENV) {
      case NodeEnv.Develop: {
        filePath = EnvFiles.Develop;
        break;
      }
      case NodeEnv.Production: {
        filePath = EnvFiles.Production;
        break;
      }
      case NodeEnv.Testing: {
        filePath = EnvFiles.Testing;
        break;
      }
      default: {
        filePath = EnvFiles.Stage;
        break;
      }
    }

    const envFile = path.resolve(process.cwd(), folder, filePath);

    fs.readFile(envFile, (exception, data) => {
      if (exception) {
        throw new InternalServerErrorException(exception.message);
      }

      this.envConfig = dotenv.parse(data);
      const { error } = envValidationSchema.validate(this.envConfig, {
        abortEarly: true,
      });

      if (error) {
        throw new Error(
          `Validation failed - Is there an environment variable missing?
            ${error.message}`,
        );
      }
    });
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
