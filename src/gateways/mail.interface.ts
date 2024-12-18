import { MailData } from 'libs';

interface IMailService {
  send(mailData: MailData);
  setSesTransport(mailData: MailData): void;
  setGcpTransport(mailData: MailData): Promise<void>;
}

export { IMailService };
