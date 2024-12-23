import { Module } from '@nestjs/common';

import { WsGateway } from './ws.service';

@Module({
  providers: [WsGateway],
  exports: [WsGateway],
})
export class WebsocketsModule {}
