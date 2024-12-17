import { Controller, Get, Query } from "@nestjs/common";

import { Public } from "core";
import { AbstractAuthUseCase } from "gateways";

@Controller("auth")
@Public()
export class AuthController {
  constructor(private readonly _authService: AbstractAuthUseCase) {}

  @Get("oauth")
  oauth() {
    const url = this._authService.getAuthUrl();
    return { url };
  }

  @Get("callback")
  async callback(@Query("code") code: string) {
    if (!code) {
      return { error: "Authorization code is missing" };
    }
    const tokens = await this._authService.getTokens(code);
    return tokens;
  }
}
