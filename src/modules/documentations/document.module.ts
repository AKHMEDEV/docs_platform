import { Module } from '@nestjs/common';
import { DocumentationController } from './document.controlller';
import { DocumentationService } from './document.service';
import { PrismaService } from 'src/prisma';
import { UserModule } from '../user-auth';

@Module({
  imports: [UserModule],
  controllers: [DocumentationController],
  providers: [DocumentationService, PrismaService],
})
export class DocumentationModule {}
