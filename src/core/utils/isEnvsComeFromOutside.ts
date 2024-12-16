const isEnvsComeFromOutside = () =>
  process.env.NODE_ENV &&
  process.env.DATABASE_CONNECTION_STRING &&
  process.env.ACCESS_SECRET &&
  process.env.REFRESH_SECRET &&
  process.env.ACCESS_PERIOD &&
  process.env.REFRESH_PERIOD &&
  process.env.MAIL_HOST &&
  process.env.MAIL_CREDENTIALS_LOGIN &&
  process.env.MAIL_CREDENTIALS_PASSWORD &&
  process.env.MAIL_PORT &&
  process.env.MAIL_SECURITY_FLAG;

export { isEnvsComeFromOutside };
