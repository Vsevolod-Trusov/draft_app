import { Module } from '@nestjs/common';

import { MailModule } from './mail';
import { UserModule } from './user';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, MailModule, AuthModule],
  exports: [UserModule],
})
class ControllersModule {}

export { ControllersModule };
