import { Type } from 'class-transformer';
import { IsInt, IsObject, IsOptional, IsString } from 'class-validator';

export class GetAllDocumentationsQueryDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  sort?: string = 'createdAt';

  @IsOptional()
  @IsString()
  order?: 'asc' | 'desc' = 'desc';

  @IsOptional()
  @IsObject()
  filter?: Record<string, any>;
}
