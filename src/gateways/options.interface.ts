import { UserDto } from 'api/user/user.dto';
import { DatabaseOptions } from './database-filter.interface';

interface ServiceOptions extends DatabaseOptions<UserDto> {
  payload?: Record<string, unknown>;
}

export { ServiceOptions };
