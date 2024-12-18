import { Module } from '@nestjs/common';

import { AuthModule } from './auth';
import { MailModule } from './mail';
import { UserModule } from './user';

@Module({
  imports: [UserModule, MailModule, AuthModule],
  exports: [UserModule],
})
class ControllersModule {}

export { ControllersModule };
