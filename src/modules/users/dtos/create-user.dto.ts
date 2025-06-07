import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({
    type: 'string',
    example: 'tom',
    required: true,
  })
  @IsString()
  username: string;

  @ApiProperty({
    type: 'string',
    example: 'tom@gmail.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
    example: 'tom123',
    minLength: 6,
    required: true,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    type: 'string',
    enum: Role,
    example: Role.USER,
    required: false,
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
