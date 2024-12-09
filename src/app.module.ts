import { Module } from '@nestjs/common';

import { ControllersModule } from 'api';
import { DatabaseModule } from 'frameworks';

@Module({
  imports: [DatabaseModule, ControllersModule],
})
class AppModule {}

export { AppModule };
