import { User } from '@prisma/client';

interface UserDto extends User {
  payload: Record<string, unknown>;
}

interface UserPayload {
  sub: number;
  role: string;
}

type PartialUserDto = Partial<UserDto>;

export { PartialUserDto, UserDto, UserPayload };
