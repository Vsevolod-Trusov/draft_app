import { Module } from "@nestjs/common";

import { AbstractAuthUseCase } from "gateways";

import { AuthController } from "./controller/auth.controller";
import { AuthUseCase } from "./use-case";

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: AbstractAuthUseCase,
      useClass: AuthUseCase,
    },
  ],
})
export class AuthModule {}
