import { Injectable } from '@nestjs/common';
import { GenericBaseUseCase } from 'core';
import { DatabaseService } from 'gateways';
import { UserEntity } from 'libs';

@Injectable()
export class UserUseCase extends GenericBaseUseCase<UserEntity> {
  constructor(private readonly _dataService: DatabaseService) {
    super(_dataService.userRepository);
  }
}
