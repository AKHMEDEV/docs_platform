import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  token: string;
  
  @ApiProperty({ type: 'string' })
  @IsString()
  @MinLength(6)
  newPassword: string;
}
