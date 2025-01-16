import { Controller, Get } from '@nestjs/common';
import { Routes } from 'core';

import { Public } from 'libs';

@Public()
@Controller(Routes.HubSpot)
export class HubspotController {
  @Get()
  public get(): string {
    return 'hubspot';
  }
}
