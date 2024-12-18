import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DependenciesNames, NodeEnv } from 'core/data';
import { AbstractJwtAuthService, ConfigServiceActions, DatabaseService } from 'gateways';

@Injectable()
export class AuthService implements AbstractJwtAuthService {
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
          secret: this._configService.get(NodeEnv.AccessSecret),
          expiresIn: this._configService.get(NodeEnv.AccessPeriod),
        },
      ),
      this._jwtService.signAsync(
        {
          sub,
          role,
        },
        {
          secret: this._configService.get(NodeEnv.RefreshSecret),
          expiresIn: this._configService.get(NodeEnv.RefreshPeriod),
        },
      ),
    ]);

    return [accessToken, refreshToken];
  }
}
