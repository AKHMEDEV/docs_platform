import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { DocumentationService } from './document.service';
import { GetAllDocumentationsQueryDto } from './dtos/getall-document-query.dto';
import { CreateDocumentationDto } from './dtos';

@ApiTags('documentations')
@Controller('documentations')
export class DocumentationController {
  constructor(private readonly service: DocumentationService) {}

  @ApiOperation({ summary: 'get all' })
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

  @ApiOperation({ summary: 'create' })
  @Post()
  async create(@Body() createDto: CreateDocumentationDto) {
    return this.service.create(createDto);
  }
}
