import { Module } from '@nestjs/common';
import { DocumentationController } from './document.controlller';
import { DocumentationService } from './document.service';
import { PrismaService } from 'src/prisma';

@Module({
  controllers: [DocumentationController],
  providers: [DocumentationService, PrismaService],
})
export class DocumentationModule {}
