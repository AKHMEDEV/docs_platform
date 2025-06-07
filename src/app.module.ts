import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma';
import { UserModule } from './modules/user-auth';
import { MailModule } from './common/nodemailler';
import { CategoryModule } from './modules/categories';
import { DocumentationModule } from './modules/documentations';
import { CommentModule } from './modules/comments/coment.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
    PrismaModule,
    UserModule,
    MailModule,
    CategoryModule,
    DocumentationModule,
    CommentModule,
  ],
})
export class AppModule {}
