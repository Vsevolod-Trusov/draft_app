import { Module } from '@nestjs/common';

import { AbstractBaseUseCase } from 'gateways';

import { UserController } from './controller/user.controller';
import { UserUseCase } from './use-case/user.use-case';

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
