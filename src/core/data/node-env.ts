enum NodeEnv {
  Develop = 'develop',
  Stage = 'stage',
  Testing = 'test',
  Production = 'production',
  AccessSecret = 'ACCESS_SECRET',
  AccessPeriod = 'ACCESS_PERIOD',
  RefreshSecret = 'REFRESH_SECRET',
  RefreshPeriod = 'REFRESH_PERIOD',
}

enum EnvFiles {
  Develop = '.develop.env',
  Stage = '.stage.env',
  Testing = '.test.env',
  Production = '.production.env',
}

export { EnvFiles, NodeEnv };
