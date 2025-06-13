import { Controller, Get, Res } from '@nestjs/common';
import { ExportService } from './exel.service';
import { Response } from 'express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Exel')
@Controller('excels')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @ApiOperation({ summary: 'export all documents to Excel ' })
  @Get('getAllDoc')
  exportPosts(@Res() res: Response) {
    return this.exportService.exportPostsToExcel(res);
  }
}
