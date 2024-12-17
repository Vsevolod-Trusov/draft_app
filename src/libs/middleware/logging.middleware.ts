import {
  Inject,
  Injectable,
  LoggerService,
  NestMiddleware,
} from "@nestjs/common";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";

import { getLoggingInfo } from "core";
import { FastifyRequest } from "fastify";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService
  ) {}

  use(request: FastifyRequest, _, done: () => void) {
    this.logger.log(getLoggingInfo(request), LoggerMiddleware.name), done();
  }
}
