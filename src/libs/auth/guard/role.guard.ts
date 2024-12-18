import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  matchRoles(roles: string[], userRole: string) {
    return roles.some(role => role === userRole);
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndMerge<string[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);

    if (!roles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const { user } = req;

    return user && this.matchRoles(roles, user.role);
  }
}
