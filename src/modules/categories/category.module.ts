import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PrismaService } from 'src/prisma';
import { CheckAuthGuard } from 'src/guards';
import { JwtHelper } from 'src/helpers';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [CategoryController],
  providers: [
    CategoryService,
    PrismaService,
    CheckAuthGuard,
    JwtHelper,
    JwtService,
  ],
})
export class CategoryModule {}
