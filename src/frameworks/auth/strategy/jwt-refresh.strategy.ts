import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { UserPayload } from 'api';
import { HeaderNames, JwtStrategyNames, NodeEnv } from 'core/data';
import { FastifyReply, FastifyRequest } from 'fastify';

import { ConfigServiceActions } from 'gateways';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { checkIncomingPayload } from 'utils';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, JwtStrategyNames.Refresh) {
  private static _isCookieExtractorUsed: boolean;

  constructor(
    // @Inject(DEPENDANCY_NAMES.AUTH_SERVICE_ACTIONS)
    // private readonly authService: AuthServiceActions,

    private readonly configService: ConfigServiceActions,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromHeader(HeaderNames.RefreshHeader)]),
      ignoreExpiration: false,
      secretOrKey: configService.get(NodeEnv.RefreshSecret),
      passReqToCallback: true,
    });
  }

  static extractRefreshToken(request: FastifyRequest) {
    const cookies = request?.cookies;
    const refreshToken = cookies?.refreshToken;
    this._isCookieExtractorUsed = true;

    return refreshToken;
  }

  async validate(request: FastifyRequest, reply: FastifyReply, incomingPayload: unknown): Promise<UserPayload> {
    const { sub, role }: UserPayload = checkIncomingPayload(incomingPayload);
    // const currentRefreshToken = await this.redisService.get(`${sub}`);

    // if (!currentRefreshToken) {
    //   throw new UnauthorizedException("User's session is finished. Login in the system again");
    // }

    // const [access, refresh] = await this.authService.getTokens(sub, role);
    const [access, refresh] = ['acc', 'refr'];
    // this.redisService.set(`${sub}`, refresh);

    if (RefreshStrategy._isCookieExtractorUsed) {
      reply.setCookie('userRole', role, { httpOnly: true });
      RefreshStrategy._isCookieExtractorUsed = false;
    } else {
      reply.header(HeaderNames.Authorization, `Bearer ${access}`);
      reply.header(HeaderNames.RefreshHeader, `Bearer ${refresh}`);
    }

    return { sub, role };
  }
}
