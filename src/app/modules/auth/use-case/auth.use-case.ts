import { Injectable } from "@nestjs/common";
import { google } from "googleapis";

import { AbstractAuthUseCase } from "gateways";

@Injectable()
export class AuthUseCase extends AbstractAuthUseCase {
  private readonly _oAuth2Client;

  constructor() {
    super();
    console.log(process.env.GCP_REDIRECT_URI);
    this._oAuth2Client = new google.auth.OAuth2(
      
    );
  }

  async getTokens(code: string): Promise<any> {
    const { tokens } = await this._oAuth2Client.getToken(code);
    return tokens;
  }

  getAuthUrl(): string {
    return this._oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/gmail.send"],
      prompt: "consent",
    });
  }
}
