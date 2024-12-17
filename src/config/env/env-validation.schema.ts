import * as Joi from "joi";

export const envFileValidationSchema = Joi.object({
  BACKEND_PORT: Joi.number().required(),
  BACKEND_ADDRESS: Joi.string().required(),
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
  COOKIE_SECRET: Joi.string().required(),
  GCP_CLIENT_EMAIL: Joi.string().required(),
  GCP_CLIENT_ID: Joi.string().required(),
  GCP_CLIENT_SECRET: Joi.string().required(),
  GCP_CLIENT_REFRESH_TOKEN: Joi.string().required(),
});
