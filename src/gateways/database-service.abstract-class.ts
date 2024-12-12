import { UserEntity } from 'libs';

import { BaseRepository } from './repository';

abstract class DatabaseService {
  public userRepository: BaseRepository<UserEntity>;
}

export { DatabaseService };
