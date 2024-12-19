import { EMAIL_SUBJECT, SmtpMessage } from 'core';

const buildGcpMessage = ({ from, to, subject, message }: SmtpMessage) => {
  const str = [`From: ${from}`, `To: ${to}`, `Subject: ${subject || EMAIL_SUBJECT}`, message].join('\n');
  const raw = Buffer.from(str).toString('base64');

  return {
    raw,
  };
};

export { buildGcpMessage };
