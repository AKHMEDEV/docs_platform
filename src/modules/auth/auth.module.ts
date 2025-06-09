import { Module } from '@nestjs/common';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { FsHelper, JwtHelper } from 'src/helpers';
import { PrismaModule, PrismaService } from 'src/prisma';
import { MailModule, MailService } from 'src/common';
import { GoogleStrategy } from './strategy/google-strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PrismaModule,
    MailModule,
    PassportModule.register({ defaultStrategy: 'google' }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    JwtHelper,
    FsHelper,
    PrismaService,
    MailService,
    GoogleStrategy,
  ],
  exports: [JwtHelper, FsHelper, PassportModule],
})
export class AuthModule {}
