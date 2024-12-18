import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserPayload } from 'app';
import { DependenciesNames, JwtStrategyNames, NodeEnv } from 'core';
import { checkIncomingPayload } from 'core/utils';
import { FastifyRequest } from 'fastify';
import { ConfigServiceActions } from 'gateways';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, JwtStrategyNames.Access) {
  constructor(
    @Inject(DependenciesNames.ConfigServiceActions)
    private readonly _configService: ConfigServiceActions,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        AccessStrategy.extractAccessToken,
      ]),
      ignoreExpiration: false,
      secretOrKey: _configService.get(NodeEnv.AccessSecret),
    });
  }
  static extractAccessToken(request: FastifyRequest) {
    const cookies = request?.cookies;
    const accessToken = cookies?.accessToken;
    return accessToken;
  }

  validate(incomingPayload: unknown): UserPayload {
    const payload: UserPayload = checkIncomingPayload(incomingPayload);

    return payload;
  }
}
