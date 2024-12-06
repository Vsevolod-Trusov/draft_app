import { User } from 'frameworks/database/prisma/entities/user.entity';
import { BaseRepository } from './repository';

abstract class DatabaseService {
  protected userRepository: BaseRepository<User>;
}

export { DatabaseService };
