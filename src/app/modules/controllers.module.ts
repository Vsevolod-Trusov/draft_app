import { Module } from '@nestjs/common';

import { AuthModule } from './auth';
import { HubspotModule } from './hubspot';
import { MailModule } from './mail';
import { UserModule } from './user';

@Module({
  imports: [UserModule, MailModule, AuthModule, HubspotModule],
})
class ControllersModule {}

export { ControllersModule };
