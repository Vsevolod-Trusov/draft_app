import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { google } from "googleapis";
import { Options } from "nodemailer/lib/smtp-transport";

import { DEVELOP_MESSAGE, EMAIL_TITLE } from "core";
import { IMailService } from "gateways";

import { Transporter } from "nodemailer";
import { MailData } from "./types";

@Injectable()
export class MailService implements IMailService {
  private _transporter: Transporter;
  constructor(private readonly _mailerService: MailerService) {}

  setSesTransport(mailData: MailData): void {
    throw new Error("Method not implemented.");
  }

  async setGcpTransport({
    mail,
    access_token,
    refresh_token,
  }: MailData): Promise<void> {
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      process.env.GCP_CLIENT_ID,
      process.env.GCP_CLIENT_SECRET,
      process.env.GCP_REDIRECT_URI
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

    this._mailerService.addTransporter("gcp", config);
  }

  async send({
    receiver,
    refresh_token,
    access_token,
    mail,
    transportType,
  }: MailData) {
    await new Promise((resolve) => {
      resolve(
        transportType === "gcp"
          ? this.setGcpTransport({
              mail,
              access_token,
              refresh_token,
              receiver,
            })
          : this.setSesTransport({
              mail,
              access_token,
              refresh_token,
              receiver,
            })
      );
    });

    return this._mailerService.sendMail({
      from: `Information mail | <${mail}>`,
      transporterName: transportType,
      to: receiver,
      subject: EMAIL_TITLE,
      text: DEVELOP_MESSAGE,
    });
  }
}
