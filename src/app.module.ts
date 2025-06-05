import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma';
import { UserModule } from './modules/user-auth';
import { MailModule } from './common/nodemailler';
import { CategoryModule } from './modules/categories';
import { DocumentationModule } from './modules/documentations';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UserModule,
    MailModule,
    CategoryModule,
    DocumentationModule,
  ],
})
export class AppModule {}
