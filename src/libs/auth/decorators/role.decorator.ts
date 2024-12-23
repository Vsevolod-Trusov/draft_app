import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from 'core';

export const Role = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
