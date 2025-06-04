import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const categories = await this.prisma.category.findMany({
      include: {
        documentations: true,
      },
    });

    return {
      message: 'success',
      count: categories.length,
      data: categories,
    };
  }

  async getOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        documentations: true,
      },
    });

    if (!category) {
      throw new NotFoundException('cateory not found');
    }

    return {
      message: 'success',
      data: category,
    };
  }

  async create(payload: CreateCategoryDto) {
    const exists = await this.prisma.category.findUnique({
      where: { name: payload.name },
    });

    if (exists) {
      throw new ConflictException('category with this name already exists');
    }

    const category = await this.prisma.category.create({
      data: {
        name: payload.name,
        description: payload.description,
      },
    });

    return {
      message: 'succes',
      data: category,
    };
  }

  // update
  async update(id: string, payload: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException('category not found');
    }

    // check for name conflict
    if (payload.name && payload.name !== category.name) {
      const duplicate = await this.prisma.category.findUnique({
        where: { name: payload.name },
      });

      if (duplicate) {
        throw new ConflictException('Another category with this name exists');
      }
    }

    const updatedCategory = await this.prisma.category.update({
      where: { id },
      data: {
        name: payload.name,
        description: payload.description,
      },
    });

    return {
      message: 'updated',
      data: updatedCategory,
    };
  }

  // delete
  async delete(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException('category not found');
    }

    await this.prisma.category.delete({
      where: { id },
    });

    return {
      message: 'category deleted',
      data: category,
    };
  }
}
