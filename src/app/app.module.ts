import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { EnvConfigModule, options } from 'config';
import { AuthModule, CombinedGuard, DatabaseModule, WebsocketsModule, WinstonLogginModule } from 'libs';
import { AllExceptionsFilter, LoggerMiddleware } from 'libs/middleware';

import { ControllersModule } from './modules';

@Module({
  imports: [
    EnvConfigModule.forRoot(options),
    AuthModule,
    DatabaseModule,
    ControllersModule,
    WinstonLogginModule,
    WebsocketsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: CombinedGuard,
    },
  ],
})
class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

export { AppModule };
