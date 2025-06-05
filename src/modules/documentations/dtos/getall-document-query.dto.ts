import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAllDocumentationsQueryDto {
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsString()
  sort?: string;

  @IsOptional()
  @IsString()
  order?: 'asc' | 'desc';

  @IsOptional()
  filter?: {
    title?: string;
  };

  @IsOptional()
  @IsString()
  search?: string;
}
