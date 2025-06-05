import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { GetAllDocumentationsQueryDto } from './dtos/getall-document-query.dto';
import { CreateDocumentationDto } from './dtos';

@Injectable()
export class DocumentationService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(query: GetAllDocumentationsQueryDto) {
    const {
      page = 1,
      limit = 30,
      sort = 'createdAt',
      order = 'asc',
      filter = {},
    } = query;
    const skip = (page - 1) * limit;

    const allowedSortFields = ['createdAt', 'updatedAt', 'views', 'title'];
    if (!allowedSortFields.includes(sort)) {
      throw new BadRequestException('invalid sort field');
    }

    const where: any = {};
    if (filter.title) {
      where.title = { contains: filter.title, mode: 'insensitive' };
    }

    const [totalCount, docs] = await Promise.all([
      this.prisma.documentation.count({ where }),
      this.prisma.documentation.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { [sort]: order },
        include: {
          category: {
            select: {
              id: true,
              name: true,
            },
          },
          author: {
            select: {
              id: true,
              username: true,
              role: true,
            },
          },
          comments: true,
          reactions: true,
        },
      }),
    ]);

    return {
      count: docs.length,
      data: docs,
      meta: {
        total: totalCount,
        page,
        lastPage: Math.ceil(totalCount / limit),
      },
    };
  }

  async create(payload: CreateDocumentationDto) {
    const existauthor = await this.prisma.user.findUnique({
      where: { id: payload.authorId },
    });
    if (!existauthor) {
      throw new BadRequestException('author with id does not exist');
    }

    const existcategory = await this.prisma.category.findUnique({
      where: { id: payload.categoryId },
    });
    if (!existcategory) {
      throw new BadRequestException('category with id does not exist');
    }

    const documentation = await this.prisma.documentation.create({
      data: {
        title: payload.title,
        content: payload.content,
        categoryId: payload.categoryId,
        authorId: payload.authorId,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            role: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    return {
      message: 'created',
      data: documentation,
    };
  }
}
