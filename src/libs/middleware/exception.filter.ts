import { Catch, ExecutionContext, HttpException, Inject, LoggerService } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import {
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { extractHttpExceptionMessage, NodeEnv } from 'core';

@Catch()
export class AllExceptionsFilter {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  catch(exception: any, context: ExecutionContext): void {
    const response = context.switchToHttp().getResponse();
    response.code(HttpStatus.INTERNAL_SERVER_ERROR);

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const messages: string | object = exception.getResponse();
      const data = extractHttpExceptionMessage(messages);

      this.logger.error(data, AllExceptionsFilter.name);

      return response.code(status).send({
        message:
          process.env.NODE_ENV === NodeEnv.Develop || process.env.NODE_ENV === NodeEnv.Local ? data : exception.message,
      });
    } else if (exception instanceof PrismaClientKnownRequestError) {
      this.logger.error(`[DATABASE EXCEPTION]: ${exception}`, AllExceptionsFilter.name);

      return response.send({ message: exception.message });
    } else if (exception instanceof PrismaClientUnknownRequestError) {
      this.logger.error(`[PRISMA UNKNOWN REQUEST EXCEPTION]: ${exception.message}`, AllExceptionsFilter.name);

      return response.send({ message: exception.message });
    } else if (exception instanceof PrismaClientRustPanicError) {
      this.logger.error(`[PRISMA RUST PANIC EXCEPTION]: ${exception.message}`, AllExceptionsFilter.name);

      return response.send({ message: exception.message });
    }

    return response.send({ message: exception.message });
  }
}
