import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto, UpdateCommentDto } from './dtos';
import { PrismaService } from 'src/prisma';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllComments() {
    const comments = await this.prisma.comment.findMany({
      include: {
        author: {
          select: { id: true, username: true },
        },
        document: {
          select: { id: true, title: true },
        },
        parent: true,
        replies: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      count:comments.length,
      data: comments,
    };
  }

  async getOne(id: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, username: true },
        },
        document: {
          select: { id: true, title: true },
        },
        parent: true,
        replies: true,
      },
    });

    if (!comment) throw new NotFoundException('comment not found');

    return {
      message: 'success',
      data: comment,
    };
  }

  async create(payload: CreateCommentDto) {
    const existAuthor = await this.prisma.user.findUnique({
      where: { id: payload.authorId },
    });
    if (!existAuthor)
      throw new BadRequestException('author with id does not exist');

    const existDocument = await this.prisma.documentation.findUnique({
      where: { id: payload.documentId },
    });
    if (!existDocument)
      throw new BadRequestException('document with id does not exist');

    if (payload.parentId) {
      const existParentComment = await this.prisma.comment.findUnique({
        where: { id: payload.parentId },
      });
      if (!existParentComment)
        throw new BadRequestException('parent comment with id does not exist');
    }

    const comment = await this.prisma.comment.create({
      data: {
        content: payload.content,
        authorId: payload.authorId,
        documentId: payload.documentId,
        parentId: payload.parentId || null,
      },
    });

    return {
      message: 'Comment created',
      data: comment,
    };
  }
  
  async update(id: string, userId: string, payload: UpdateCommentDto) {
    const existComment = await this.prisma.comment.findUnique({
      where: { id },
    });
    if (!existComment) throw new NotFoundException('comment not found');

    if (existComment.authorId !== userId) {
      throw new ForbiddenException('borib ozizdi camentizdi update qling');
    }

    const updatedComment = await this.prisma.comment.update({
      where: { id },
      data: { content: payload.content },
    });

    return {
      message: 'updated',
      data: updatedComment,
    };
  }

  async delete(id: string, userId: string) {
    const existComment = await this.prisma.comment.findUnique({
      where: { id },
    });
    if (!existComment) throw new NotFoundException('comment not found');

    if (existComment.authorId !== userId) {
      throw new ForbiddenException('borib ozizdi camentizdi delete qling');
    }

    await this.prisma.comment.delete({ where: { id } });

    return { message: 'deleted' };
  }
}
