import { Body, Controller, HttpStatus, Post, Response } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { Routes } from 'core';
import { AbstractMailUseCase } from 'gateways';
import { Public, TransportType } from 'libs';

import { MailBody } from '../dto';

@Public()
@Controller(Routes.MailPrefix)
export class MailController {
  constructor(private readonly mailService: AbstractMailUseCase) {}

  @Post(Routes.Send)
  public async sendMail(@Body() { transportType, ...mailData }: MailBody, @Response() response: FastifyReply) {
    const mailResult = await this.mailService.sendMail({
      transportType: transportType as TransportType,
      ...mailData,
    });

    return response.status(HttpStatus.OK).send(mailResult);
  }
}
