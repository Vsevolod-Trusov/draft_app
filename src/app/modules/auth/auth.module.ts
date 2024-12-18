import { Module } from "@nestjs/common";

import { AbstractAuthUseCase } from "gateways";

import { google } from "googleapis";
import { AuthController } from "./controller/auth.controller";
import { AuthUseCase } from "./use-case";

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: AbstractAuthUseCase,
      useFactory: () => {
        const oauth2 = new google.auth.OAuth2(
          process.env.GCP_CLIENT_ID,
          process.env.GCP_CLIENT_SECRET,
          process.env.GCP_REDIRECT_URI
        );

        return new AuthUseCase(oauth2);
      },
    },
  ],
})
export class AuthModule {}
