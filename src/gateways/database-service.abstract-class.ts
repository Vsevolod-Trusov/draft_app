import { UserEntity } from "frameworks";

import { BaseRepository } from "./repository";

abstract class DatabaseService {
  public userRepository: BaseRepository<UserEntity>;
}

export { DatabaseService };
