import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AbstractAuthService } from "gateways";

import { AuthService } from "./auth.service";
import { CustomAuthGuard, RoleGuard } from "./guard";
import { RefreshStrategy } from "./strategy/jwt-refresh.strategy";
import { AccessStrategy } from "./strategy/jwt.strategy";
@Global()
@Module({
  imports: [JwtModule.register({})],
  providers: [
    {
      provide: AbstractAuthService,
      useClass: AuthService,
    },
    AccessStrategy,
    RefreshStrategy,
    CustomAuthGuard,
    RoleGuard,
  ],
  exports: [
    CustomAuthGuard,
    RoleGuard,
    AccessStrategy,
    RefreshStrategy,
    AbstractAuthService,
  ],
})
export class AuthModule {}
