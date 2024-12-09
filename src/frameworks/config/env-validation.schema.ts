import * as Joi from 'joi';

export const envFileValidationSchema = Joi.object({
  NODE_ENV: Joi.string().required(),
  DATABASE_CONNECTION_STRING: Joi.string().required(),
});
