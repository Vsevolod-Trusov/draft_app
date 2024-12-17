import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { DependenciesNames } from "core";
import { AbstractJwtAuthService } from "gateways";

import { AuthService } from "./auth.service";
import { CustomAuthGuard, RoleGuard } from "./guard";
import { RefreshStrategy } from "./strategy/jwt-refresh.strategy";
import { AccessStrategy } from "./strategy/jwt.strategy";
@Global()
@Module({
  imports: [JwtModule.register({})],
  providers: [
    {
      provide: DependenciesNames.ConfigServiceActions,
      useClass: ConfigService,
    },
    {
      provide: AbstractJwtAuthService,
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
    AbstractJwtAuthService,
  ],
})
export class AuthModule {}
