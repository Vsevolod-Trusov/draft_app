import { Module } from '@nestjs/common';

import { AbstractMailUseCase } from 'gateways';
import { MailConfigModule } from 'libs';

import { MailController } from './controller';
import { MailUseCase } from './use-case';

@Module({
  imports: [MailConfigModule],
  controllers: [MailController],
  providers: [
    {
      provide: AbstractMailUseCase,
      useClass: MailUseCase,
    },
  ],
})
export class MailModule {}
