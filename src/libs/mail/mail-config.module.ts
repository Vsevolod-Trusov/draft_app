import { Module } from '@nestjs/common';
import { DependenciesNames } from 'core';

import { MailService } from './mail.service';

@Module({
  providers: [
    {
      provide: DependenciesNames.MailService,
      useClass: MailService,
    },
  ],
  exports: [DependenciesNames.MailService],
})
export class MailConfigModule {}
