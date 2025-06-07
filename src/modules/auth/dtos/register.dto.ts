import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'tom',
  })
  @MinLength(4)
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: 'tom@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'tom123',
    minLength: 4,
  })
  @IsNotEmpty()
  @MinLength(4)
  password: string;

}
