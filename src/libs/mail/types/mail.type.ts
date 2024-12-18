type TransportType = 'ses' | 'gcp';

interface MailData {
  receiver: string;
  mail: string;
  refresh_token?: string;
  access_token?: string;
  transportType?: TransportType;
}

export { MailData, TransportType };
