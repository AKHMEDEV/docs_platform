import { Language } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CategoryTranslationDto {
  @ApiProperty({ example: 'uz' })
  @IsEnum(Language)
  lang: Language;

  @ApiProperty({ example: 'Backend' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Node.js haqida' })
  @IsString()
  @IsNotEmpty()
  description: string;
}
