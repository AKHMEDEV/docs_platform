import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';
import { Language } from '@prisma/client';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all categories by language' })
  @ApiQuery({
    name: 'lang',
    enum: Language,
    required: false,
    description: 'Tilni tanlang: uz (default), ru, en',
  })
  getAll(@Query('lang') lang?: Language) {
    return this.service.getAll(lang || Language.uz);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one category by ID and language' })
  @ApiParam({ name: 'id', required: true })
  @ApiQuery({
    name: 'lang',
    enum: Language,
    required: false,
    description: 'Tilni tanlang: uz (default), ru, en',
  })
  getOne(@Param('id') id: string, @Query('lang') lang?: Language) {
    return this.service.getOne(id, lang || Language.uz);
  }

  @Post()
  @ApiOperation({ summary: 'Create new category with translations' })
  create(@Body() payload: CreateCategoryDto) {
    return this.service.create(payload);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update category and its translations' })
  @ApiParam({ name: 'id', required: true })
  update(@Param('id') id: string, @Body() payload: UpdateCategoryDto) {
    return this.service.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete category and its translations' })
  @ApiParam({ name: 'id', required: true })
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
