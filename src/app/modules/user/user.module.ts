import { Module } from '@nestjs/common';
import { AbstractUserUseCase } from 'gateways';

import { UserController } from './controller/user.controller';
import { UserUseCase } from './use-case/user.use-case';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: AbstractUserUseCase,
      useClass: UserUseCase,
    },
  ],
})
export class UserModule {}
