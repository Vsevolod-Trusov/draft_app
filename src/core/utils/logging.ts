import { FastifyRequest } from 'fastify';

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

const getErrorData = (request: FastifyRequest, exception: Error) => {
  const log = getLoggingInfo(request);
  return log + `[ERROR]: ${exception.message || exception} |`;
};

export { getErrorData, getLoggingInfo };
