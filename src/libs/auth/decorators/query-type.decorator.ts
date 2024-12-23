import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const QueryType = createParamDecorator((data: string[] | null, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const queryParams = request.query;

  if (data && Array.isArray(data)) {
    return data.reduce((result, key) => {
      if (key in queryParams) {
        result[key] = queryParams[key];
      }
      return result;
    }, {});
  }

  return queryParams;
});

export { QueryType };
