interface MailBody {
  access_token: string;
  refresh_token: string;
  sender: string;
  receiver: Array<string>;
  subject?: string;
  message: string;
  transportType?: string;
}

export { MailBody };
