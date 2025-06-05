import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'this is a comment' })
  @IsString()
  content: string;

  @ApiProperty({ type: 'string' })
  @IsUUID()
  authorId: string;

  @ApiProperty({ type: 'string' })
  @IsUUID()
  documentId: string;

  @ApiProperty({ type: 'string' })
  @IsUUID()
  @IsOptional()
  parentId?: string;
}
