import { Module } from '@nestjs/common';

import { AbstractBaseUseCase } from 'gateways';

import { UserController } from './user.controller';
import { UserUseCase } from './user.use-case';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: AbstractBaseUseCase,
      useClass: UserUseCase,
    },
  ],
})
export class UserModule {}
