import { Module } from '@nestjs/common';
import { ExportService } from './exel.service';
import { ExportController } from './exel.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { PrismaService } from 'src/prisma';

@Module({
  imports:  [PrismaModule,AuthModule],
  controllers: [ExportController],
  providers: [ExportService, PrismaService],
})
export class ExelModule {}
