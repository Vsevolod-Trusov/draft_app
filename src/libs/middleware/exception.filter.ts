import { Catch, ExecutionContext, HttpException, Inject, LoggerService } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import {
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library';
import { getErrorData } from 'core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Catch()
export class AllExceptionsFilter {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  catch(exception: any, context: ExecutionContext): void {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const data = getErrorData(request, exception);

      this.logger.error(`INPUT: ${data};`, AllExceptionsFilter.name);

      response.code(status).send({ message: exception.message });
    } else if (exception instanceof PrismaClientKnownRequestError) {
      this.logger.error(`DATABASE EXCEPTION ${exception}`, AllExceptionsFilter.name);

      response.code(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: exception.message });
    } else if (exception instanceof PrismaClientUnknownRequestError) {
      this.logger.error(`PRISMA UNKNOWN REQUEST EXCEPTION: ${exception.message}`, AllExceptionsFilter.name);

      response.code(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: exception.message });
    } else if (exception instanceof PrismaClientRustPanicError) {
      this.logger.error(`PRISMA RUST PANIC EXCEPTION: ${exception.message}`, AllExceptionsFilter.name);

      response.code(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: exception.message });
    }
  }
}
