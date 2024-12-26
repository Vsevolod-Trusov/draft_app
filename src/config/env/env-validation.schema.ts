import * as Joi from 'joi';

export const envFileValidationSchema = Joi.object({
  BACKEND_PORT: Joi.number().required(),
  BACKEND_ADDRESS: Joi.string().required(),
  DATABASE_CONNECTION_STRING: Joi.string().required(),
  ACCESS_SECRET: Joi.string().required(),
  REFRESH_SECRET: Joi.string().required(),
  ACCESS_PERIOD: Joi.string().required(),
  REFRESH_PERIOD: Joi.string().required(),
  COOKIE_SECRET: Joi.string().required(),
  GCP_CLIENT_EMAIL: Joi.string().required(),
  GCP_CLIENT_ID: Joi.string().required(),
  GCP_CLIENT_SECRET: Joi.string().required(),
  GCP_CLIENT_REFRESH_TOKEN: Joi.string().required(),
  GCP_REDIRECT_URI: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  PG_SCHEMA: Joi.string().required(),
});
