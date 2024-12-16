import { Controller, Get } from '@nestjs/common';

import { Public, Routes } from 'core';
import { AbstractMailUseCase } from 'gateways';
import { MailData } from 'libs';

@Public()
@Controller(Routes.MailPrefix)
export class MailController {
  constructor(private readonly mailService: AbstractMailUseCase) {}

  @Get(Routes.Send)
  public sendMail() {
    const mailData: MailData = {
      receiver: 'michail.shatilo@orangesoft.co',
    };

    return this.mailService.sendMail(mailData);
  }
}
