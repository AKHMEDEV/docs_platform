import { Module } from '@nestjs/common';
import { DocumentationController } from './document.controlller';
import { DocumentationService } from './document.service';
import { PrismaService } from 'src/prisma';
import { UserModule } from '../users';
import { MailService } from 'src/common';

@Module({
  imports: [UserModule],
  controllers: [DocumentationController],
  providers: [DocumentationService, PrismaService,MailService],
})
export class DocumentationModule {}
