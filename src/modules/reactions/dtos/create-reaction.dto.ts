import { IsUUID } from 'class-validator';

export class ToggleReactionDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  documentId: string;
}
