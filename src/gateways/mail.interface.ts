import { MailData } from 'libs';

interface IMailService {
  sendFromBotMail(mailData: MailData);
  sendGcpMail(mailData: MailData);
  sendMSMail(mailData: MailData);
}

export { IMailService };
