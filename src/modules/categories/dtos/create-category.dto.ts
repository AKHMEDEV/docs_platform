import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CategoryTranslationDto } from './category-translation.sto';

export class CreateCategoryDto {
  @ApiProperty({ type: [CategoryTranslationDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryTranslationDto)
  translations: CategoryTranslationDto[];
}
