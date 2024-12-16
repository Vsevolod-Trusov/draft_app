require('dotenv').config({ path: `./.${process.env.NODE_ENV}.env` });

const commonEnvs = {
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_CONNECTION_STRING: process.env.DATABASE_CONNECTION_STRING,
  ACCESS_SECRET: process.env.ACCESS_SECRET,
  REFRESH_SECRET: process.env.REFRESH_SECRET,
  ACCESS_PERIOD: process.env.ACCESS_PERIOD,
  REFRESH_PERIOD: process.env.REFRESH_PERIOD,
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_CREDENTIALS_LOGIN: process.env.MAIL_CREDENTIALS_LOGIN,
  MAIL_CREDENTIALS_PASSWORD: process.env.MAIL_CREDENTIALS_PASSWORD,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_SECURITY_FLAG: process.env.MAIL_SECURITY_FLAG,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  BACKEND_ADDRESS: process.env.BACKEND_ADDRESS,
  BACKEND_PORT: process.env.BACKEND_PORT,
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
      env_local: {
        ...commonEnvs,
      },
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
