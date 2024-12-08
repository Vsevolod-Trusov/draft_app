import { Module } from "@nestjs/common";

import { BaseService } from "gateways";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: BaseService,
      useClass: UserService,
    },
  ],
})
export class UserModule {}
