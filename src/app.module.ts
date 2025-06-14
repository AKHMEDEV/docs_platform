import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma';
import { UserModule } from './modules/users';
import { MailModule } from './common/nodemailler';
import { CategoryModule } from './modules/categories';
import { DocumentationModule } from './modules/documentations';
import { CommentModule } from './modules/comments/coment.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { ReactionModule } from './modules/reactions/reaction.module';
import { ExelModule } from './modules/exel/exel.module';

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
    AuthModule,
    UserModule,
    MailModule,
    CategoryModule,
    DocumentationModule,
    CommentModule,
    ReactionModule,
    ExelModule,
  ],
})
export class AppModule {}
