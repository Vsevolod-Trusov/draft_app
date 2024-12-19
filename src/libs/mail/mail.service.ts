import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

import { google } from 'googleapis';
import { GaxiosPromise } from 'googleapis/build/src/apis/abusiveexperiencereport';

import { buildGcpMessage, SchemaMessage, SmtpMessage } from 'core';
import { IMailService } from 'gateways';

import { MailData } from './types';

@Injectable()
export class MailService implements IMailService {
  constructor(private readonly _mailerService: MailerService) {}

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
