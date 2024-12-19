import { Inject, Injectable } from '@nestjs/common';

import { DependenciesNames } from 'core';
import { AbstractMailUseCase, IMailService } from 'gateways';
import { MailData } from 'libs';

@Injectable()
export class MailUseCase extends AbstractMailUseCase {
  constructor(
    @Inject(DependenciesNames.MailService)
    private readonly mailService: IMailService,
  ) {
    super();
  }

  sendMail({ transportType, ...mailData }: MailData) {
    switch (transportType) {
      case 'gcp': {
        return this.mailService.sendGcpMail({ transportType, ...mailData });
      }
      case 'ms': {
        return this.mailService.sendMSMail({ transportType, ...mailData });
      }
      default: {
        return this.mailService.sendFromBotMail({ transportType, ...mailData });
      }
    }
  }
}
