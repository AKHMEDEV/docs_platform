import { Module } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ReactionController } from './reaction.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma';

@Module({
  imports: [JwtModule.register({})],
  controllers: [ReactionController],
  providers: [ReactionService, PrismaService],
})
export class ReactionModule {}
