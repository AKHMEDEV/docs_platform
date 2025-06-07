import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FsHelper, JwtHelper } from 'src/helpers';
import { PrismaModule, PrismaService } from 'src/prisma';
import { MailModule, MailService } from 'src/common';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    JwtService,
    JwtHelper,
    FsHelper,
    UserService,
    PrismaService,
    MailService,
  ],
  exports:[JwtHelper,FsHelper]
})
export class UserModule {}
