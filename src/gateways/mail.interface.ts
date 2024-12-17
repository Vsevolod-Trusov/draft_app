import { MailData } from "libs";

interface IMailService {
  send(mailData: MailData);
  setTransport(): void;
}

export { IMailService };
