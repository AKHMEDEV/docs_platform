import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CategoryTranslationDto } from './category-translation.sto';

export class UpdateCategoryDto {
  @ApiPropertyOptional({ type: [CategoryTranslationDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryTranslationDto)
  translations?: CategoryTranslationDto[];
}
