import { Injectable } from "@nestjs/common";

import { AbstractAuthUseCase } from "gateways";

@Injectable()
export class AuthUseCase extends AbstractAuthUseCase {
  constructor(private readonly _oAuth2Client) {
    super();
  }

  async getTokens(code: string): Promise<any> {
    const { tokens } = await this._oAuth2Client.getToken(code);
    return tokens;
  }

  getAuthUrl(): string {
    const oauthOptions = {
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/gmail.send"],
      prompt: "consent",
    };

    return this._oAuth2Client.generateAuthUrl(oauthOptions);
  }
}
