import { Injectable } from '@nestjs/common';

import { UserEntity } from 'frameworks';

import { DatabaseService } from 'gateways';
import { GenericBaseUseCase } from 'generics';

@Injectable()
export class UserUseCase extends GenericBaseUseCase<UserEntity> {
  constructor(private readonly _dataService: DatabaseService) {
    super(_dataService.userRepository);
  }
}
