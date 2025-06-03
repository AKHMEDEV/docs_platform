import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtHelper } from 'src/helpers';
import { PrismaService } from 'src/prisma';

@Module({
  controllers: [AuthController, UserController],
  providers: [AuthService, JwtService, JwtHelper, UserService,PrismaService],
})
export class UserModule {}
