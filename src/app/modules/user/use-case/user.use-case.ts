import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { GenericBaseUseCase } from 'core';
import { DatabaseService } from 'gateways';

@Injectable()
export class UserUseCase extends GenericBaseUseCase<User> {
  constructor(private readonly _dataService: DatabaseService) {
    super(_dataService.userRepository);
  }
}
