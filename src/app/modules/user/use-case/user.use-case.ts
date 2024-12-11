import { Injectable } from '@nestjs/common';

import { GenericBaseUseCase } from 'core';
import { UserEntity } from 'frameworks';
import { DatabaseService } from 'gateways';

@Injectable()
export class UserUseCase extends GenericBaseUseCase<UserEntity> {
  constructor(private readonly _dataService: DatabaseService) {
    super(_dataService.userRepository);
  }
}
