import { EnvConfigOptions } from 'gateways';

import { envFileValidationSchema } from './env-validation.schema';

export const options: EnvConfigOptions = {
  folder: './env-config',
  envValidationSchema: envFileValidationSchema,
};
