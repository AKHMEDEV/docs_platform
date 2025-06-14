import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';
import { Language } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(lang: Language = 'uz') {
    const categories = await this.prisma.category.findMany({
      include: {
        translations: {
          where: { lang },
          select: { name: true, description: true },
        },
        documentations: {
          select: {
            id: true,
            authorId: true,
            title: true,
            content: true,
            views: true,
          },
        },
      },
    });

    const data = categories.map((cat) => ({
      id: cat.id,
      name: cat.translations[0]?.name || null,
      description: cat.translations[0]?.description || null,
      documentations: cat.documentations,
    }));

    return {
      message: 'success',
      count: data.length,
      data,
    };
  }

  async getOne(id: string, lang: Language = 'uz') {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        translations: {
          where: { lang },
          select: { name: true, description: true },
        },
        documentations: {
          select: {
            id: true,
            authorId: true,
            title: true,
            content: true,
            views: true,
          },
        },
      },
    });

    if (!category) {
      throw new NotFoundException('category not found');
    }

    return {
      message: 'success',
      data: {
        id: category.id,
        name: category.translations[0]?.name || null,
        description: category.translations[0]?.description || null,
        documentations: category.documentations,
      },
    };
  }

  async create(payload: CreateCategoryDto) {
    const category = await this.prisma.category.create({
      data: {
        translations: {
          createMany: {
            data: payload.translations.map((t) => ({
              lang: t.lang,
              name: t.name,
              description: t.description,
            })),
          },
        },
      },
      include: {
        translations: true,
      },
    });

    return {
      message: 'created',
      data: category,
    };
  }

  async update(id: string, payload: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('category not found');
    }

    if (payload.translations?.length) {
      await this.prisma.categoryTranslation.deleteMany({
        where: { categoryId: id },
      });

      await this.prisma.categoryTranslation.createMany({
        data: payload.translations.map((t) => ({
          lang: t.lang,
          name: t.name,
          description: t.description,
          categoryId: id,
        })),
      });
    }

    return {
      message: 'updated',
    };
  }

  async delete(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('category not found');
    }

    await this.prisma.category.delete({
      where: { id },
    });

    return {
      message: 'deleted',
    };
  }
}
