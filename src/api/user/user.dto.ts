import { PartialType } from '@nestjs/mapped-types';
import { UserEntity } from 'frameworks/database/prisma/entities/user.entity';

class UserDto extends UserEntity {
  payload: Record<string, unknown>;
}

class PartialUserDto extends PartialType(UserDto) {}

export { PartialUserDto, UserDto };
