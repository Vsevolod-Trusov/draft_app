import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { SimpleExpressionParser } from 'core/utils/parseFilter';

export const GlobalFilter = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  const parsedFilter = SimpleExpressionParser.parse(request.query.filter);

  return parsedFilter || [];
});
