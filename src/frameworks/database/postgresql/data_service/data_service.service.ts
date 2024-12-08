import { Injectable } from "@nestjs/common";

import { BaseRepository, DatabaseService } from "gateways";

import { UserEntity } from "../entities";

@Injectable()
export class DataService extends DatabaseService {
  public userRepository: BaseRepository<UserEntity>;

  constructor(_userRepository: BaseRepository<UserEntity>) {
    super();
    this.userRepository = _userRepository;
  }
}
