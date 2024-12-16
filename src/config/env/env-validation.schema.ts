import * as Joi from 'joi';

export const envFileValidationSchema = Joi.object({
  DATABASE_CONNECTION_STRING: Joi.string().required(),
  ACCESS_SECRET: Joi.string().required(),
  REFRESH_SECRET: Joi.string().required(),
  ACCESS_PERIOD: Joi.string().required(),
  REFRESH_PERIOD: Joi.string().required(),
  MAIL_HOST: Joi.string().required(),
  MAIL_CREDENTIALS_LOGIN: Joi.string().required(),
  MAIL_CREDENTIALS_PASSWORD: Joi.string().required(),
  MAIL_PORT: Joi.number().required(),
  MAIL_SECURITY_FLAG: Joi.string().required(),
});
