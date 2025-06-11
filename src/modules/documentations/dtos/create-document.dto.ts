import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDocumentationDto {
  @ApiProperty({
    example: 'New documentation title',
    minLength: 5,
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  @Length(5, 100)
  title: string;

  @ApiProperty({
    example: 'This is  a content new documentation',
    minLength: 20,
    maxLength: 100000,
  })
  @IsNotEmpty()
  @IsString()
  @Length(20, 100000)
  content: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsUUID()
  authorId: string;
}
