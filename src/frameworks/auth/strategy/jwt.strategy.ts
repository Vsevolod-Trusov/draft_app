import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { UserPayload } from 'api';
import { JwtStrategyNames, NodeEnv } from 'core';
import { FastifyRequest } from 'fastify';
import { ConfigServiceActions } from 'gateways';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { checkIncomingPayload } from 'utils';

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, JwtStrategyNames.Access) {
  constructor(private readonly _configService: ConfigServiceActions) {
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
