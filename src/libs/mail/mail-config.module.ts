import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { DependenciesNames } from 'core';

import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: 'smtps://user@domain.com:pass@smtp.domain.com',
        preview: true,
      }),
    }),
  ],
  providers: [
    {
      provide: DependenciesNames.MailService,
      useClass: MailService,
    },
  ],
  exports: [DependenciesNames.MailService],
})
export class MailConfigModule {}
