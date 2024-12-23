import { UnauthorizedException } from '@nestjs/common';

import { UserPayload } from 'app';
import { ExceptionMessage } from 'core';

export const checkIncomingPayload = (incomingPayload: unknown): UserPayload => {
  let payload: UserPayload;

  if (typeof incomingPayload === 'object' && incomingPayload !== null && 'sub' in incomingPayload) {
    const sub = (incomingPayload as { sub: unknown }).sub;

    if (typeof sub === 'number') {
      payload = { ...payload, sub };
    } else {
      throw new UnauthorizedException(ExceptionMessage.InvalidJwtSub);
    }
  } else {
    throw new UnauthorizedException(ExceptionMessage.JwtSubRequired);
  }

  if ('role' in incomingPayload) {
    const role = (incomingPayload as { role: unknown }).role;

    if (typeof role === 'string') {
      payload = { ...payload, role };
    } else {
      throw new UnauthorizedException(ExceptionMessage.InvalidJwtRoleFormat);
    }
  } else {
    throw new UnauthorizedException(ExceptionMessage.JwtRoleRequired);
  }

  return payload;
};
