import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { DocumentationService } from './document.service';
import { GetAllDocumentationsQueryDto } from './dtos/getall-document-query.dto';
import { CreateDocumentationDto, UpdateDocumentationDto } from './dtos';
import { CheckAuthGuard, CheckRolesGuard } from 'src/guards';
import { Role } from '@prisma/client';
import { Roles } from 'src/decorators';

@ApiTags('documentations')
@Controller('documentations')
export class DocumentationController {
  constructor(private readonly service: DocumentationService) {}

  @ApiOperation({ summary: 'get all' })
  @ApiQuery({ name: 'search', required: false})
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'sort', required: false, enum: ['views', 'title'] })
  @ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'] })
  @ApiQuery({ name: 'filter[title]', required: false, type: String })
  @ApiQuery({ name: 'filter[categoryId]', required: false, type: String })
  @ApiQuery({ name: 'filter[authorId]', required: false, type: String })
  @Get()
  async getAll(@Query() query: GetAllDocumentationsQueryDto) {
    return this.service.getAll(query);
  }

  @Post()
  @ApiOperation({ summary: 'create' })
  async create(@Body() createDto: CreateDocumentationDto) {
    return this.service.create(createDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'get one' })
  async getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.getOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateDocumentationDto,
  ) {
    return this.service.update(id, payload);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.delete(id);
  }
}
