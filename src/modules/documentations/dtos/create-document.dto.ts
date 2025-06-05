import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDocumentationDto {
  @ApiProperty({
    example: 'My Documentation Title',
    minLength: 5,
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  @Length(5, 100)
  title: string;

  @ApiProperty({
    example: 'This is the detailed content of the documentation',
    minLength: 20,
    maxLength: 100000,
  })
  @IsNotEmpty()
  @IsString()
  @Length(20, 100000)
  content: string;

  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @IsNotEmpty()
  @IsUUID()
  authorId: string;
}
