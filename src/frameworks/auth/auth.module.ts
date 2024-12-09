import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AbstractAuthService } from 'gateways';
import { AuthService } from './auth.service';
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
    {
      provide: DEPENDANCY_NAMES.AUTH_SERVICE_ACTIONS,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
