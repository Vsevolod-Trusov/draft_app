import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule, CombinedGuard, DatabaseModule, EnvConfigModule, options } from 'frameworks';

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
