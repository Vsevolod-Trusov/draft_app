import { Controller, Get, Query } from "@nestjs/common";

import { Public, Routes } from "core";
import { AbstractMailUseCase } from "gateways";
import { MailData } from "libs";

@Public()
@Controller(Routes.MailPrefix)
export class MailController {
  constructor(private readonly mailService: AbstractMailUseCase) {}

  @Get(Routes.Send)
  public sendMail(
    @Query("access") access_token?: string,
    @Query("mail") mail?: string,
    @Query("refresh") refresh_token?: string
  ) {
    const mailData: MailData = {
      receiver: "michail.shatilo@orangesoft.co",
      access_token,
      mail,
      refresh_token,
    };

    return this.mailService.sendMail(mailData);
  }
}
