enum NodeEnv {
  Develop = 'develop',
  Local = 'local',
  Stage = 'stage',
  Testing = 'test',
  Production = 'production',
  AccessSecret = 'ACCESS_SECRET',
  AccessPeriod = 'ACCESS_PERIOD',
  RefreshSecret = 'REFRESH_SECRET',
  RefreshPeriod = 'REFRESH_PERIOD',
  MailHost = 'MAIL_HOST',
  MailCredentialsLogin = 'MAIL_CREDENTIALS_LOGIN',
  MailCredentialsPassword = 'MAIL_CREDENTIALS_PASSWORD',
  MailPort = 'MAIL_PORT',
  MailSecurityFlag = 'MAIL_SECURITY_FLAG',
}

enum EnvFiles {
  Develop = '.develop.env',
  Local = '.local.env',
  Stage = '.stage.env',
  Testing = '.test.env',
  Production = '.production.env',
}

export { EnvFiles, NodeEnv };
