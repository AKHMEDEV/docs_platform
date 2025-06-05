import { IsOptional, IsString, IsUUID, Length } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateDocumentationDto {
  @ApiPropertyOptional({
    example: 'updated documentation title',
    minLength: 5,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @Length(5, 100)
  title?: string;

  @ApiPropertyOptional({
    example: 'updated    content of the documentation',
    minLength: 20,
    maxLength: 100000,
  })
  @IsOptional()
  @IsString()
  @Length(20, 100000)
  content?: string;

  @ApiPropertyOptional({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @IsOptional()
  @IsUUID()
  categoryId?: string;
}
