interface SmtpMessage {
  from: string;
  to: Array<string>;
  subject?: string;
  message: string;
}

interface SchemaMessage {
  raw?: string | null;
}

export { SchemaMessage, SmtpMessage };
