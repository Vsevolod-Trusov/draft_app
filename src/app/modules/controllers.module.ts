import { Module } from '@nestjs/common';

import { MailModule } from './mail';
import { UserModule } from './user';

@Module({
  imports: [UserModule, MailModule],
  exports: [UserModule],
})
class ControllersModule {}

export { ControllersModule };
