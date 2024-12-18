import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { DependenciesNames } from "core/data";

import { ConfigService } from "./env-config.service";
@Module({})
export class EnvConfigModule {
  static forRoot(options): DynamicModule {
    return {
      global: true,
      module: ConfigModule,
      providers: [
        {
          provide: DependenciesNames.EnvConfigOptions,
          useValue: options,
        },
        {
          provide: DependenciesNames.ConfigServiceActions,
          useClass: ConfigService,
        },
      ],
      exports: [DependenciesNames.ConfigServiceActions],
    };
  }
}
