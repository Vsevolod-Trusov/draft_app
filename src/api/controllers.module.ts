import { Module } from '@nestjs/common';

import { UserModule } from './user';

@Module({
  imports: [UserModule],
  exports: [UserModule],
})
class ControllersModule {}

export { ControllersModule };
