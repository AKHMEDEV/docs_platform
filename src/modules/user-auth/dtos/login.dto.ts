import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: 'string',
    example: 'akhmed@gmail.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
    example: 'akhmed123',
    minLength: 4,
    maxLength: 20,
    required: true,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
