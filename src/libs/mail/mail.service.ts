import { Injectable } from '@nestjs/common';
import { DEVELOP_MESSAGE, EMAIL_TITLE, MESSAGE_NAME } from 'core';
import { Transporter, createTransport } from 'nodemailer';

import { MailData } from './types';

@Injectable()
export class MailingService {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport(
      {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: process.env.MAILER_SECURE === 'true',
        auth: {
          user: process.env.APP,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      {
        from: {
          name: MESSAGE_NAME,
          address: process.env.APP,
        },
      },
    );
  }

  sendMail({ receiver }: MailData) {
    return this.transporter.sendMail({
      to: receiver,
      subject: EMAIL_TITLE,
      text: DEVELOP_MESSAGE,
    });
  }
}
