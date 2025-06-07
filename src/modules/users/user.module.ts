import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FsHelper, JwtHelper } from 'src/helpers';
import { PrismaModule, PrismaService } from 'src/prisma';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [UserController],
  providers: [
    JwtHelper,
    FsHelper,
    UserService,
    PrismaService,
  ],
  exports:[JwtHelper,FsHelper]
})
export class UserModule {}
