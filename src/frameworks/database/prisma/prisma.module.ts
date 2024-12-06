import { Module } from '@nestjs/common';
import { DatabaseService } from 'gateways/database';

@Module({
  exports: [DatabaseService],
})
export class PrismaModule {}
