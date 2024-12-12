require('dotenv').config({ path: `./.${process.env.NODE_ENV}.env` });

const commonEnvs = {
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_CONNECTION_STRING: process.env.DATABASE_CONNECTION_STRING,
  ACCESS_SECRET: process.env.ACCESS_SECRET,
  REFRESH_SECRET: process.env.REFRESH_SECRET,
  ACCESS_PERIOD: process.env.ACCESS_PERIOD,
  REFRESH_PERIOD: process.env.REFRESH_PERIOD,
};

module.exports = {
  apps: [
    {
      name: 'zumi-backend',
      script: 'dist/main.js',
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: '1G',
      env_develop: {
        ...commonEnvs,
      },
      env_production: {
        ...commonEnvs,
      },
      env_test: {
        ...commonEnvs,
      },
      env_stage: {
        ...commonEnvs,
      },
    },
  ],
};
