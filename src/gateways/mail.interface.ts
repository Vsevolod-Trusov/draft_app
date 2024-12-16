import { MailData } from 'libs';

interface IMailService {
  send(mailData: MailData);
}

export { IMailService };
