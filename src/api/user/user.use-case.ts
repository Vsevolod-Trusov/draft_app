import { BadRequestException, Injectable } from '@nestjs/common';

import { ExceptionMessage } from 'data';
import { UserEntity } from 'frameworks';

import { DatabaseService, UserServiceOptions } from 'gateways';
import { GenericBaseUseCase } from 'generics';

@Injectable()
export class UserUseCase extends GenericBaseUseCase<UserEntity> {
  constructor(private readonly _dataService: DatabaseService) {
    super(_dataService.userRepository);
  }

  getAll(options: UserServiceOptions = {}): Promise<Array<UserEntity>> {
    if (Object.keys(options).length <= 0) throw new BadRequestException(ExceptionMessage.WrongUserOptions);

    return this._dataService.userRepository.findAll();
  }
}
