import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { google } from "googleapis";
import { Options } from "nodemailer/lib/smtp-transport";

import { DEVELOP_MESSAGE, EMAIL_TITLE } from "core";
import { IMailService } from "gateways";

import { createTransport } from "nodemailer";
import { MailData } from "./types";

@Injectable()
export class MailService implements IMailService {
  constructor(private readonly _mailerService: MailerService) {}

  async setDefaultTransport(): Promise<void> {
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      process.env.GCP_CLIENT_ID,
      process.env.GCP_CLIENT_SECRET,
      "http://localhost:3000/api/v1/auth/callback"
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

    this._mailerService.addTransporter("default", config);
  }

  // async setGcpTransport(
  //   mail: string,
  //   access_token: string,
  //   refresh_token
  // ): Promise<void> {
  //   console.log("GCP");
  //   const oAuth2Client = new google.auth.OAuth2(
  //     process.env.GCP_CLIENT_ID,
  //     process.env.GCP_CLIENT_SECRET,
  //     "http://localhost:3000/api/v1/auth/callback"
  //   );

  //   oAuth2Client.setCredentials({ refresh_token });

  //   const config: Options = {
  //     service: "gmail",
  //     auth: {
  //       type: "OAuth2",
  //       user: mail,
  //       clientId: process.env.GCP_CLIENT_ID,
  //       clientSecret: process.env.GCP_CLIENT_SECRET,
  //       // refreshToken: refresh_token,
  //       // accessToken: access_token,
  //     },
  //   };

  //   this._mailerService.addTransporter("lol", config);
  // }

  async setGcpTransport(
    mail: string,
    access_token: string,
    refresh_token: string
  ): Promise<void> {
    let transporter = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: mail,
        accessToken: access_token,
      },
    });

    this._mailerService.addTransporter("lol", transporter);
  }

  async send({ receiver, refresh_token, access_token, mail }: MailData) {
    await new Promise((resolve) => {
      resolve(
        refresh_token
          ? this.setGcpTransport(mail, access_token, refresh_token)
          : this.setDefaultTransport()
      );
    });

    return this._mailerService.sendMail({
      transporterName: refresh_token ? "lol" : "default",
      to: receiver,
      from: mail || process.env.GCP_CLIENT_EMAIL,
      subject: EMAIL_TITLE,
      text: DEVELOP_MESSAGE,
    });
  }
}
