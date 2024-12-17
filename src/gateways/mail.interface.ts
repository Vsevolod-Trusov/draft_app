import { MailData } from "libs";

interface IMailService {
  send(mailData: MailData);
  setDefaultTransport(): void;
  setGcpTransport(
    mail: string,
    access_token: string,
    refresh_token: string
  ): Promise<void>;
}

export { IMailService };
