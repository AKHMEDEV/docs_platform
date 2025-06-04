import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtHelper } from 'src/helpers';
import { PrismaModule, PrismaService } from 'src/prisma';
import { MailModule, MailService } from 'src/common';

@Module({
  imports: [PrismaModule, MailModule],
  controllers: [AuthController, UserController],
  providers: [
    AuthService,
    JwtService,
    JwtHelper,
    UserService,
    PrismaService,
    MailService,
  ],
})
export class UserModule {}
