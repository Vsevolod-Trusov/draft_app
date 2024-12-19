type TransportType = 'ms' | 'gcp' | 'bot';

interface MailData {
  receiver: Array<string>;
  sender: string;
  refresh_token: string;
  access_token: string;
  message: string;
  transportType: TransportType;
  subject?: string;
}

interface BotMailData extends Omit<MailData, 'access_token' | 'refresh_token'> {}

export { BotMailData, MailData, TransportType };
