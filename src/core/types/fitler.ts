import { IsEnum, IsOptional, IsString } from 'class-validator';

enum ComparisonOperator {
  EQUAL = '=',
  GREATER_THAN = '>',
  LESS_THAN = '<',
}

const OperatorsPriority = {
  eq: 1,
  ne: 1,
  gt: 1,
  ge: 1,
  lt: 1,
  le: 1,
  and: 2,
  or: 2,
  not: 2,
  '(': 0,
  ')': 0,
};

class GlobalFilterDto {
  @IsOptional()
  @IsString()
  field: string;

  @IsOptional()
  @IsEnum(ComparisonOperator)
  operator: ComparisonOperator;

  @IsOptional()
  @IsString()
  value: string;
}

export { ComparisonOperator, GlobalFilterDto };
