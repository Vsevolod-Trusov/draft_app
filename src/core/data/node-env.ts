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
  GCP_CLIENT_EMAIL = 'GCP_CLIENT_EMAIL',
  GCP_CLIENT_ID = 'GCP_CLIENT_ID',
  GCP_CLIENT_SECRET = 'GCP_CLIENT_SECRET',
  GCP_CLIENT_REFRESH_TOKEN = 'GCP_CLIENT_REFRESH_TOKEN',
  GCP_REDIRECT_URI = 'GCP_REDIRECT_URI',
}

enum EnvFiles {
  Develop = '.develop.env',
  Local = '.local.env',
  Mvp = '.mvp.env',
  Production = '.production.env',
}

export { EnvFiles, NodeEnv };
