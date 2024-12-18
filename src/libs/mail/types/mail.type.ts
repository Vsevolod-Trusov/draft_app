interface MailData {
  receiver: string;
  mail: string;
  refresh_token?: string;
  access_token?: string;
  transportType?: "ses" | "gcp";
}

export { MailData };
