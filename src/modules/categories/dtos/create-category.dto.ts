import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Backend',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Node.js, Express, PostgreSQL haqida hujjatlar',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
