import { Injectable } from '@nestjs/common';

import { DEVELOP_MESSAGE, EMAIL_TITLE, MESSAGE_NAME, NodeEnv } from 'core';
import { IMailService } from 'gateways';
import { createTransport, Transporter } from 'nodemailer'; // поправил имя функции (должно быть `createTransport`)

import { MailData } from './types';

@Injectable()
export class MailService implements IMailService {
  private readonly _transporter: Transporter;
  constructor() {
    const mailOptions = {
      host: process.env[NodeEnv.MailHost],
      port: +process.env[NodeEnv.MailPort],
      secure: process.env[NodeEnv.MailSecurityFlag] === 'true',
      auth: {
        user: process.env[NodeEnv.MailCredentialsLogin],
        pass: process.env[NodeEnv.MailCredentialsPassword],
      },
    };
    const senderMessageMetadata = {
      from: {
        name: MESSAGE_NAME,
        address: process.env[NodeEnv.MailCredentialsLogin],
      },
    };
    this._transporter = createTransport(mailOptions, senderMessageMetadata);
  }

  send({ receiver }: MailData) {
    return this._transporter.sendMail({
      to: receiver,
      subject: EMAIL_TITLE,
      text: DEVELOP_MESSAGE,
    });
  }
}
