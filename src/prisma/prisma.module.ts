import { Module } from '@nestjs/common';
import { PrismaService } from './prisme.service';

@Module({
  providers: [PrismaService],
})
export class PrismaModule {}
