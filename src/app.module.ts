import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { PrismaModule } from './prisma';
import { UserModule } from './modules/user-auth';
import { MailModule } from './common/nodemailler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UserModule,
    MailModule,
  ],
})
export class AppModule {}
