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

  sendMail(mail: MailData) {
    return this.mailService.send(mail);
  }
}
