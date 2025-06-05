import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { GetAllDocumentationsQueryDto } from './dtos/getall-document-query.dto';
import { CreateDocumentationDto, UpdateDocumentationDto } from './dtos';

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
      search,
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

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [totalCount, docs] = await Promise.all([
      this.prisma.documentation.count({ where }),
      this.prisma.documentation.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { [sort]: order },
        include: {
          category: { select: { id: true, name: true } },
          author: { select: { id: true, username: true, role: true } },
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

  async getOne(id: string) {
    const documentation = await this.prisma.documentation.findUnique({
      where: { id },
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
        comments: {
          select: {
            id: true,
            authorId: true,
            content: true,
          },
        },
        reactions: {
          select: {
            id: true,
            userId: true,
            commentId: true,
          },
        },
      },
    });

    if (!documentation) {
      throw new NotFoundException(`documentation with id ${id} not found`);
    }

    return documentation;
  }

  async update(id: string, payload: UpdateDocumentationDto) {
    const existing = await this.prisma.documentation.findUnique({
      where: { id },
    });

    if (!existing) throw new NotFoundException('not found');

    if (payload.categoryId) {
      const categroy = await this.prisma.category.findUnique({
        where: { id: payload.categoryId },
      });
      if (!categroy) throw new NotFoundException('category not found');
    }
    if (payload.authorId) {
      const author = await this.prisma.category.findUnique({
        where: { id: payload.authorId },
      });
      if (!author) throw new NotFoundException('author not found');
    }

    const updated = await this.prisma.documentation.update({
      where: { id },
      data: payload,
      include: {
        category: { select: { id: true, name: true } },
        author: { select: { id: true, username: true, role: true } },
      },
    });
  }

  async delete(id: string) {
    const existing = await this.prisma.documentation.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('document not found');
    }

    await this.prisma.documentation.delete({
      where: { id },
    });

    return {
      message: 'deleted',
    };
  }
}
