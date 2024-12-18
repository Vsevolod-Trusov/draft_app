import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'core';

import { CustomAuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';

@Injectable()
export class CombinedGuard implements CanActivate {
  constructor(
    private readonly _customAuthGuard: CustomAuthGuard,
    private readonly _roleGuard: RoleGuard,
    private readonly _reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this._reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const canActivateAuth = await this._customAuthGuard.canActivate(context);
    if (!canActivateAuth) {
      return false;
    }

    const canActivateRole = await this._roleGuard.canActivate(context);
    return canActivateRole;
  }
}
