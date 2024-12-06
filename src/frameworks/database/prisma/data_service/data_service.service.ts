import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'gateways/database';
import { BaseRepository } from 'gateways/repository';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class DataService extends DatabaseService {
  userRepository: BaseRepository<UserEntity>;
}
