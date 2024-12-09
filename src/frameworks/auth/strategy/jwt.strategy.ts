import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { checkIncomingPayload, DEPENDANCY_NAMES, ENV_VARIABLES_NAMES, STRATAGY_NAMES } from 'core';
import { ConfigServiceActions, UserPayload } from 'gateways';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, STRATAGY_NAMES.ACCESS) {
  constructor(
    @Inject(DEPENDANCY_NAMES.CONFIG_SERVICE_ACTIONS)
    private readonly configService: ConfigServiceActions,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken()]),
      ignoreExpiration: false,
      secretOrKey: configService.get(ENV_VARIABLES_NAMES.ACCESS_SECRET),
    });
  }

  validate(incomingPayload: unknown): UserPayload {
    const payload: UserPayload = checkIncomingPayload(incomingPayload);

    return payload;
  }
}
