import { Injectable } from '@nestjs/common';
import { UserEntity } from 'frameworks/database/prisma/entities/user.entity';
import { ServiceOptions } from 'gateways/options.interface';
import { IUserService } from 'gateways/service/user-service.interface';
import { PartialUserDto, UserDto } from './user.dto';

@Injectable()
export class UserService implements IUserService {
  getAll(options: ServiceOptions): Promise<Array<UserEntity>> {
    throw new Error('Method not implemented.');
  }
  getOne(options: ServiceOptions): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }
  createOne(UserEntity: UserDto): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }
  createMany(UserEntitys: Array<UserDto>): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }
  updateOne(options: ServiceOptions, updateUserEntity: PartialUserDto): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }
  updateMany(): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }
  remove(options: ServiceOptions): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }
}
