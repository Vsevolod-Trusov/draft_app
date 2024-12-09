import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { DependenciesNames, NodeEnv } from 'data';
import { AbstractAuthService, ConfigServiceActions, DatabaseService } from 'gateways';

@Injectable()
export class AuthService implements AbstractAuthService {
  constructor(
    private readonly _dataService: DatabaseService,
    @Inject(DependenciesNames.ConfigServiceActions)
    private readonly _configService: ConfigServiceActions,
    private readonly _jwtService: JwtService,
  ) {}

  async getTokens(sub: number, role: string): Promise<string[]> {
    const [accessToken, refreshToken] = await Promise.all([
      this._jwtService.signAsync(
        {
          sub,
          role,
        },
        {
          secret: this._configService.get(NodeEnv.SecretAccess),
          expiresIn: this._configService.get(NodeEnv.PeriodAccess),
        },
      ),
      this._jwtService.signAsync(
        {
          sub,
          role,
        },
        {
          secret: this._configService.get(NodeEnv.SecretRefresh),
          expiresIn: this._configService.get(NodeEnv.PeriodRefresh),
        },
      ),
    ]);

    return [accessToken, refreshToken];
  }
}
