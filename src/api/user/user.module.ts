import { Module } from "@nestjs/common";

import { AbstractBaseService } from "gateways";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: AbstractBaseService,
      useClass: UserService,
    },
  ],
})
export class UserModule {}
