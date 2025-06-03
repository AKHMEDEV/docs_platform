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
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: 'tom@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'tom123456',
    minLength: 4  ,
  })
  @IsNotEmpty()
  @MinLength(4)
  password: string;

  @ApiPropertyOptional({
    enum: Role,
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
