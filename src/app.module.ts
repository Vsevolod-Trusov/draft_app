import { Module } from '@nestjs/common';
import { ControllersModule } from 'api/controllers.module';
import { DatabaseModule } from 'frameworks/database/database.module';

@Module({
  imports: [DatabaseModule, ControllersModule],
})
class AppModule {}

export { AppModule };
