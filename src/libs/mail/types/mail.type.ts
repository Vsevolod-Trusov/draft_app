type TransportType = 'ms' | 'gcp';

interface MailData {
  receiver: Array<string>;
  sender: string;
  refresh_token: string;
  access_token: string;
  message: string;
  transportType?: TransportType;
  subject?: string;
}

export { MailData, TransportType };
