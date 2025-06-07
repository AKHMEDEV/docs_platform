import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { FsHelper, JwtHelper } from 'src/helpers';
import { PrismaModule, PrismaService } from 'src/prisma';
import { MailModule, MailService } from 'src/common';

@Module({
  imports: [PrismaModule, MailModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    JwtHelper,
    FsHelper,
    PrismaService,
    MailService,
  ],
  exports:[JwtHelper,FsHelper]
})
export class AuthModule {}
