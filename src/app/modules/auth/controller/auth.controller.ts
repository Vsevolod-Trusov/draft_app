import { Controller, Get, Query } from '@nestjs/common';

import { ExceptionMessage, Routes } from 'core';
import { AbstractAuthUseCase } from 'gateways';
import { Public } from 'libs';

@Public()
@Controller(Routes.RootAuth)
export class AuthController {
  constructor(private readonly _authService: AbstractAuthUseCase) {}

  @Get(Routes.OAuth)
  oauth() {
    const url = this._authService.getAuthUrl();
    return { url };
  }

  @Get(Routes.OAuthCallback)
  async callback(@Query(Routes.CodeQuery) code: string) {
    if (!code) {
      return { error: ExceptionMessage.OAuthCodeUndetected };
    }

    const tokens = await this._authService.getTokens(code);

    return tokens;
  }
}
