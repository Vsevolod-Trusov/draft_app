import { User } from '@prisma/client';

import { BaseRepository } from './repository';

abstract class DatabaseService {
  public userRepository: BaseRepository<User>;
}

export { DatabaseService };
