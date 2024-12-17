import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { google } from "googleapis";
import { Options } from "nodemailer/lib/smtp-transport";

import { DEVELOP_MESSAGE, EMAIL_TITLE } from "core";
import { IMailService } from "gateways";

import { MailData } from "./types";

@Injectable()
export class MailService implements IMailService {
  constructor(private readonly _mailerService: MailerService) {}

  async setTransport(): Promise<void> {
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      process.env.GCP_CLIENT_ID,
      process.env.GCP_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GCP_CLIENT_REFRESH_TOKEN,
    });

    const accessToken: string = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((exception, token) => {
        if (exception) {
          reject(exception.message);
        }

        resolve(token);
      });
    });

    const config: Options = {
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GCP_CLIENT_EMAIL,
        clientId: process.env.GCP_CLIENT_ID,
        clientSecret: process.env.GCP_CLIENT_SECRET,
        accessToken,
      },
    };

    this._mailerService.addTransporter("gmail", config);
  }

  async send({ receiver }: MailData) {
    await this.setTransport();

    return this._mailerService.sendMail({
      transporterName: "gmail",
      to: receiver,
      from: "sev4kz@gmail.com",
      subject: EMAIL_TITLE,
      text: DEVELOP_MESSAGE,
    });
  }
}
