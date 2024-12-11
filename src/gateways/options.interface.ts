import { UserDto } from 'app';

import { DatabaseOptions } from './database-filter.interface';

interface UserServiceOptions extends DatabaseOptions<UserDto> {
  payload?: Record<string, unknown>;
}

export { UserServiceOptions };
