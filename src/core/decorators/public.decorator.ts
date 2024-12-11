import { SetMetadata } from '@nestjs/common';

import { IS_PUBLIC_KEY } from 'core';

export const PublicMethod = () => SetMetadata(IS_PUBLIC_KEY, true);
