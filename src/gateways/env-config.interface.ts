import Joi from 'joi';

export interface EnvConfigOptions {
  folder: string;
  envValidationSchema: Joi.ObjectSchema<unknown>;
}
export interface EnvConfigFile {
  [key: string]: string;
}
export interface ConfigServiceActions {
  get(key: string): string;
}
