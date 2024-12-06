import { PartialUserDto, UserDto } from 'api/user/user.dto';
import { UserEntity } from 'frameworks/database/prisma/entities/user.entity';
import { ServiceOptions } from 'gateways/options.interface';

interface IUserService {
  getAll(options: ServiceOptions): Promise<Array<UserEntity>>;
  getOne(options: ServiceOptions): Promise<UserEntity>;
  createOne(UserEntity: UserDto): Promise<UserEntity>;
  createMany(UserEntitys: Array<UserDto>): Promise<UserEntity>;
  updateOne(options: ServiceOptions, updateUserEntity: PartialUserDto): Promise<UserEntity>;
  updateMany(): Promise<UserEntity>;
  remove(options: ServiceOptions): Promise<UserEntity>;
}

export { IUserService };
