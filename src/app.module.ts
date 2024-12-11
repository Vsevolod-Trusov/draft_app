import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { ControllersModule } from 'api';
import { AuthModule, CombinedGuard, DatabaseModule, EnvConfigModule, options } from 'frameworks';

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
