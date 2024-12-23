import { FastifyRequest } from 'fastify';

import { ClassValidatorResponseException } from 'core';

const getLoggingInfo = (request: FastifyRequest) => {
  return `
  Protocol: ${request.protocol} |
  Method: ${request.method} | 
  Url: ${request.url} | 
  Original Url: ${request.originalUrl} |
  Parameters: ${JSON.stringify(request.params)} |
  Body ${JSON.stringify(request.body)} |
  TimeStamp: ${new Date(Date.now()).toUTCString()}\n`;
};

const extractHttpExceptionMessage = (exception: ClassValidatorResponseException | string | object) => {
  if (typeof exception === 'string') return exception;

  if (typeof exception === 'object' && typeof exception['message'] === 'string') {
    return exception['message'];
  }

  if (typeof exception === 'object' && typeof exception['message'] === 'object') {
    const message = exception['message'].map(exceptionItem => exceptionItem).join(' | ');

    return message;
  }

  return JSON.stringify(exception);
};

export { extractHttpExceptionMessage, getLoggingInfo };
