import { Transform, Type } from 'class-transformer';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { ExceptionMessage } from 'core/data';

class QueryOptions {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  offset?: number;

  @IsString()
  @IsOptional()
  @Type(() => String)
  select?: string;

  @IsObject()
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        throw new Error(ExceptionMessage.InvalidFilterQueryParameter);
      }
    }
    return value;
  })
  filter?: Record<string, string>;
}

export { QueryOptions };
