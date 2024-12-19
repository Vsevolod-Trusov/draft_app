import { SmtpMessage } from 'core';

const buildGcpMessage = ({ from, to, subject, message }: SmtpMessage) => {
  const defaultSubject = 'Zumi App';
  const str = [`From: ${from}`, `To: ${to}`, `Subject: ${subject || defaultSubject}`, message].join('\n');
  const raw = Buffer.from(str).toString('base64');

  return {
    raw,
  };
};

export { buildGcpMessage };
