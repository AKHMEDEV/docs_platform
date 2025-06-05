import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID } from 'class-validator';

export class UpdateCommentDto {

  @ApiProperty({ example: 'this is a comment' })
  @IsOptional()
  @IsString()
  content?: string;

}
