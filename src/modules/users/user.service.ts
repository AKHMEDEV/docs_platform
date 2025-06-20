import {
  Injectable,
  NotFoundException,
  ConflictException,
  OnModuleInit,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma';
import { FsHelper } from 'src/helpers';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    private prisma: PrismaService,
    private fshelper: FsHelper,
  ) {}

  async onModuleInit() {
    await this.seedUsers();
  }

  async getAll() {
    const users = await this.prisma.user.findMany({
      include: {
        documentations: {
          select: {
            id: true,
            title: true,
            views: true,
            reactions: {
              select: { type: true },
            },
          },
        },
        comments: { select: { id: true, content: true } },
      },
    });
    return {
      count: users.length,
      data: users,
    };
  }

  async getOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        documentations: {
          select: { id: true, title: true, views: true, reactions: true },
        },
        comments: { select: { id: true, content: true } },
      },
    });
    return user;
  }

  async getMe(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user;
  }

  async create(payload: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = bcrypt.hashSync(payload.password);

    const user = await this.prisma.user.create({
      data: {
        username: payload.username,
        email: payload.email,
        password: hashedPassword,
        role: payload.role || Role.USER,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      message: 'success',
      data: user,
    };
  }

  async update(id: string, payload: UpdateUserDto) {
    const existingUser = await this.prisma.user.findUnique({ where: { id } });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    if (payload.email && payload.email !== existingUser.email) {
      const userWithEmail = await this.prisma.user.findUnique({
        where: { email: payload.email },
      });
      if (userWithEmail) {
        throw new ConflictException('Email already in use');
      }
    }

    let hashedPassword;
    if (payload.password) {
      hashedPassword = bcrypt.hashSync(payload.password);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        username: payload.username ?? undefined,
        email: payload.email ?? undefined,
        password: hashedPassword ?? undefined,
        role: payload.role ?? undefined,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      message: 'success',
      data: updatedUser,
    };
  }

  async delete(id: string) {
    const existingUser = await this.prisma.user.findUnique({ where: { id } });

    if (!existingUser) {
      throw new NotFoundException('user not found');
    }

    await this.prisma.user.delete({ where: { id } });

    return {
      message: 'deleted',
      data: existingUser,
    };
  }

  async updateUserImage(userId: string, file: Express.Multer.File) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new NotFoundException('user not found');

    if (user.image) {
      await this.fshelper.removeFiles(user.image);
    }

    const { fileUrl } = await this.fshelper.uploadFile(file);

    await this.prisma.user.update({
      where: { id: userId },
      data: { image: fileUrl },
    });

    return {
      message: 'success',
      image: fileUrl,
    };
  }

  async seedUsers() {
    const defaultUsers = [
      {
        username: 'ahmed',
        email: 'ahmed@gmail.com',
        password: '0000',
        role: Role.ADMIN,
      },
    ];

    for (const user of defaultUsers) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!existingUser) {
        const hashedPassword = bcrypt.hashSync(user.password);
        await this.prisma.user.create({
          data: {
            username: user.username,
            email: user.email,
            password: hashedPassword,
            role: user.role,
          },
        });
      }
    }

    console.log('admins created 🟢');
  }
}
