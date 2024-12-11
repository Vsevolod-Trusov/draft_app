import { PartialType } from '@nestjs/mapped-types';
import { UserEntity } from 'frameworks';

class UserDto extends UserEntity {
  payload: Record<string, unknown>;
}

class UserPayload {
  sub: number;
  role: string;
}

class PartialUserDto extends PartialType(UserDto) {}

export { PartialUserDto, UserDto, UserPayload };
