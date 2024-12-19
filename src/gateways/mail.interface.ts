import { MailData } from 'libs';

interface IMailService {
  sendGcpMail(mailData: MailData);
  sendMSMail(mailData: MailData);
}

export { IMailService };
