import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { Response } from 'express';
import { PrismaService } from 'src/prisma';

@Injectable()
export class ExportService {
  constructor(private readonly prisma: PrismaService) {}

  async exportPostsToExcel(res: Response) {
    const posts = await this.prisma.documentation.findMany();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Docs');

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 38 },
      { header: 'Title', key: 'title', width: 35 },
      { header: 'AuthorID', key: 'authorId', width: 38 },
      { header: 'CreatedAt', key: 'createdAt', width: 12 },
      { header: 'View', key: 'views', width: 10 },
    ];

    posts.forEach((post) => {
      worksheet.addRow({
        id: post.id,
        title: post.title,
        authorId: post.authorId,
        createdAt: post.createdAt,
        views: post.views,
      });
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', 'attachment; filename=documentations.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  }
}
