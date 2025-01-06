import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { BaseRepository, DatabaseService } from 'gateways';

import { PrismaService } from '../prisma.service';

@Injectable()
export class DataService extends DatabaseService {
  public userRepository: BaseRepository<User>;

  constructor(prismaService: PrismaService, _userRepository: BaseRepository<User>) {
    super();
    this.userRepository = _userRepository;
  }
}
