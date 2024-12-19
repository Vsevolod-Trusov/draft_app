import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { google } from 'googleapis';
import { GaxiosPromise } from 'googleapis/build/src/apis/abusiveexperiencereport';

import { buildGcpMessage, EMAIL_SUBJECT, SchemaMessage, SmtpMessage } from 'core';
import { IMailService } from 'gateways';

import { BotMailData, MailData } from './types';

@Injectable()
export class MailService implements IMailService {
  constructor(private readonly _mailerService: MailerService) {}

  async sendFromBotMail({ receiver, subject, message, transportType }: BotMailData) {
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      process.env.GCP_CLIENT_ID,
      process.env.GCP_CLIENT_SECRET,
      process.env.GCP_REDIRECT_URI,
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

    const config: SMTPTransport.Options = {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GCP_CLIENT_EMAIL,
        clientId: process.env.GCP_CLIENT_ID,
        clientSecret: process.env.GCP_CLIENT_SECRET,
        accessToken,
      },
    };

    this._mailerService.addTransporter(transportType, config);

    return this._mailerService.sendMail({
      from: process.env.GCP_CLIENT_EMAIL,
      transporterName: transportType,
      to: receiver,
      subject: subject || EMAIL_SUBJECT,
      text: message,
    });
  }

  sendGcpMail({ refresh_token, access_token, subject, ...mailData }: MailData): GaxiosPromise<SchemaMessage> {
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2({
      clientId: process.env.GCP_CLIENT_ID,
      clientSecret: process.env.GCP_CLIENT_SECRET,
      redirectUri: process.env.GCP_REDIRECT_URI,
      credentials: {
        access_token,
        refresh_token,
      },
    });
    const gmailProvider = google.gmail({ version: 'v1', auth: oauth2Client });
    const { sender, receiver, message } = mailData;
    const buildData: SmtpMessage = {
      from: sender,
      to: receiver,
      subject: subject,
      message: message,
    };
    const messageMetadata = buildGcpMessage(buildData);

    return gmailProvider.users.messages.send({
      userId: sender,
      requestBody: messageMetadata,
    });
  }

  sendMSMail(mailData: MailData) {
    throw new Error('Method not implemented.');
  }
}
