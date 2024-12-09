enum NodeEnv {
  Develop = 'develop',
  Stage = 'stage',
  Testing = 'test',
  Production = 'production',
  SecretAccess = 'ACCESS_SECRET',
  PeriodAccess = 'ACCESS_PERIOD',
  SecretRefresh = 'REFRESH_SECRET',
  PeriodRefresh = 'REFRESH_PERIOD',
}

enum EnvFiles {
  Develop = '.develop.env',
  Stage = '.stage.env',
  Testing = '.test.env',
  Production = '.production.env',
}

export { EnvFiles, NodeEnv };
