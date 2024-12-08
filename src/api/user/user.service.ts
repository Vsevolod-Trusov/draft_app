import { Injectable } from "@nestjs/common";

import { UserEntity } from "frameworks";
import { BaseService, DatabaseService, ServiceOptions } from "gateways";

import { PartialUserDto, UserDto } from "./user.dto";

@Injectable()
export class UserService extends BaseService {
  constructor(private readonly _dataService: DatabaseService) {
    super();
  }

  getAll(options: ServiceOptions = {}): Promise<Array<UserEntity>> {
    return this._dataService.userRepository.findAll();
  }
  getOne(options: ServiceOptions): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
  createOne(UserEntity: UserDto): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
  createMany(UserEntitys: Array<UserDto>): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
  updateOne(
    options: ServiceOptions,
    updateUserEntity: PartialUserDto
  ): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
  updateMany(): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
  remove(options: ServiceOptions): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
}
