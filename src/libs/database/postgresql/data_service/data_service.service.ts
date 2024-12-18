import { Injectable } from '@nestjs/common';
import { BaseRepository, DatabaseService } from 'gateways';

import { UserEntity } from '../entities';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DataService extends DatabaseService {
  public userRepository: BaseRepository<UserEntity>;

  constructor(prismaService: PrismaService, _userRepository: BaseRepository<UserEntity>) {
    super();
    this.userRepository = _userRepository;
  }
}
