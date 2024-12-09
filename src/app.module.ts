import { Module } from '@nestjs/common';

import { ControllersModule } from 'api';
import { DatabaseModule, EnvConfigModule, options } from 'frameworks';

@Module({
  imports: [DatabaseModule, ControllersModule, EnvConfigModule.forRoot(options)],
})
class AppModule {}

export { AppModule };
