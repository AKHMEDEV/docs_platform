import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { CommentService } from './coment.service';
import { CommentController } from './coment.controller';
import { UserModule } from '../users';

@Module({
  imports: [UserModule],
  controllers: [CommentController],
  providers: [CommentService, PrismaService],
})
export class CommentModule {}
