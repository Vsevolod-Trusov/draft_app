import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { EnvConfigModule, options } from 'config';
import { AllExceptionsFilter, DatabaseModule, LoggerMiddleware, WebsocketsModule, WinstonLogginModule } from 'libs';

import { ControllersModule } from './modules';

@Module({
  imports: [EnvConfigModule.forRoot(options), DatabaseModule, ControllersModule, WinstonLogginModule, WebsocketsModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

export { AppModule };
