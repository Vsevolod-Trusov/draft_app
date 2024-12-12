import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { EnvConfigModule, options } from 'config';
import { AuthModule, CombinedGuard, DatabaseModule } from 'libs';

import { ControllersModule } from './modules';

@Module({
  imports: [EnvConfigModule.forRoot(options), AuthModule, DatabaseModule, ControllersModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: CombinedGuard,
    },
  ],
})
class AppModule {}

export { AppModule };
