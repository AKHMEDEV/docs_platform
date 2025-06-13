import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ToggleReactionDto {
  @ApiProperty({ type: 'string' })
  @IsUUID()
  userId: string;
  
  @ApiProperty({ type: 'string' })
  @IsUUID()
  documentId: string;
}
