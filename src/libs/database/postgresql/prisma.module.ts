import { Module } from '@nestjs/common';
import { User } from '@prisma/client';

import { BaseRepository, DatabaseService } from 'gateways';

import { DataService } from './data_service';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories';

@Module({
  providers: [
    PrismaService,
    {
      provide: BaseRepository<User>,
      useClass: UserRepository,
    },
    {
      provide: DatabaseService,
      useClass: DataService,
    },
  ],
  exports: [DatabaseService],
})
export class PrismaModule {}
