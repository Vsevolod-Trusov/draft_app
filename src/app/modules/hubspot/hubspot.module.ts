import { Module } from '@nestjs/common';

import { HubspotController } from './controller';

@Module({
  controllers: [HubspotController],
})
export class HubspotModule {}
