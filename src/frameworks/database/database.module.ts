import { Global, Module } from '@nestjs/common';

import { PrismaModule } from './postgresql';

@Global()
@Module({
  imports: [PrismaModule],
  exports: [PrismaModule],
})
export class DatabaseModule {}
