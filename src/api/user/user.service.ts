import { BadRequestException, Injectable } from "@nestjs/common";

import { UserEntity } from "frameworks";

import { ExceptionMessage } from "data";
import { DatabaseService, UserServiceOptions } from "gateways";
import { BaseService } from "generics";

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(private readonly _dataService: DatabaseService) {
    super(_dataService.userRepository);
  }

  getAll(options: UserServiceOptions = {}): Promise<Array<UserEntity>> {
    if (Object.keys(options).length <= 0)
      throw new BadRequestException(ExceptionMessage.WrongUserOptions);

    return this._dataService.userRepository.findAll();
  }
}
