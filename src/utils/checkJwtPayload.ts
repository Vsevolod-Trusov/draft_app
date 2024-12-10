import { UnauthorizedException } from '@nestjs/common';

import { UserPayload } from 'api';

export const checkIncomingPayload = (incomingPayload: unknown): UserPayload => {
  let payload: UserPayload;

  if (typeof incomingPayload === 'object' && incomingPayload !== null && 'sub' in incomingPayload) {
    const sub = (incomingPayload as { sub: unknown }).sub;

    if (typeof sub === 'number') {
      payload = { ...payload, sub };
    } else {
      throw new UnauthorizedException('Invalid payload: sub must be a number');
    }
  } else {
    throw new UnauthorizedException('Invalid payload: sub is required');
  }

  if ('role' in incomingPayload) {
    const role = (incomingPayload as { role: unknown }).role;

    if (typeof role === 'string') {
      payload = { ...payload, role };
    } else {
      throw new UnauthorizedException('Invalid payload: role must be a string');
    }
  } else {
    throw new UnauthorizedException('Invalid payload: role is required');
  }

  return payload;
};
