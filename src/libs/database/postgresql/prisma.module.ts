import { Module } from '@nestjs/common';
import { BaseRepository, DatabaseService } from 'gateways';

import { DataService } from './data_service';
import { UserEntity } from './entities';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories';

@Module({
  providers: [
    PrismaService,
    {
      provide: BaseRepository<UserEntity>,
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
