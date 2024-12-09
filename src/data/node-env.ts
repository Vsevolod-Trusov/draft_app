enum NodeEnv {
  Develop = 'develop',
  Stage = 'stage',
  Testing = 'test',
  Production = 'production',
}

enum EnvFiles {
  Develop = '.develop.env',
  Stage = '.stage.env',
  Testing = '.test.env',
  Production = '.production.env',
}

export { EnvFiles, NodeEnv };
