import * as Joi from 'joi';

export const envFileValidationSchema = Joi.object({
  NODE_ENV: Joi.string().required(),
  DATABASE_CONNECTION_STRING: Joi.string().required(),
  ACCESS_SECRET: Joi.string().required(),
  REFRESH_SECRET: Joi.string().required(),
  ACCESS_PERIOD: Joi.string().required(),
  REFRESH_PERIOD: Joi.string().required(),
});
