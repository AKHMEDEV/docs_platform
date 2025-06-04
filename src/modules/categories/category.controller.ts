import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CheckRolesGuard, CheckAuthGuard } from 'src/guards';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';
import { Roles } from 'src/decorators';
import { Role } from '@prisma/client';

@ApiTags('Categories')
@ApiBearerAuth()
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'get all categories with documentations' })
  getAll() {
    return this.categoryService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get one category' })
  @ApiParam({ name: 'id', required: true })
  getOne(@Param('id') id: string) {
    return this.categoryService.getOne(id);
  }

  @Post()
  @UseGuards(CheckAuthGuard, CheckRolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'create category' })
  create(@Body() payload: CreateCategoryDto) {
    return this.categoryService.create(payload);
  }

  @Patch(':id')
  @UseGuards(CheckAuthGuard, CheckRolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'update category' })
  @ApiParam({ name: 'id', required: true })
  update(@Param('id') id: string, @Body() payload: UpdateCategoryDto) {
    return this.categoryService.update(id, payload);
  }

  @Delete(':id')
  @UseGuards(CheckAuthGuard, CheckRolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'delete category ' })
  @ApiParam({ name: 'id', required: true })
  delete(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
