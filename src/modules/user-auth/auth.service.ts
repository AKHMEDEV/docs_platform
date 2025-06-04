import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto, LoginDto } from './dtos';
import * as bcrypt from 'bcryptjs';
import { JwtHelper } from 'src/helpers/jwt.helper';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma';
import { MailService } from 'src/common/nodemailler';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtHelper: JwtHelper,
    private readonly mailService: MailService,
  ) {}

  async register(payload: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (existingUser) {
      throw new ConflictException('user already exists try another');
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const user = await this.prisma.user.create({
      data: {
        username: payload.username,
        email: payload.email,
        password: hashedPassword,
      },
    });

    await this.mailService.sendMail({
      to: user.email,
      subject: `Welcome to [appname], ${user.username}!`,
      text: `Hi ${user.username},\n\nThank you for registering with [appname]. We're excited to have you on board!\n\nIf you have any questions or need assistance, feel free to reach out.\n\nBest regards,\nThe [appname] Team`,
    });

    return {
      message: 'success',
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    };
  }

  async login(payload: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const isPasswordValid = await bcrypt.compare(
      payload.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('invalid password');
    }

    const { token } = await this.jwtHelper.generateToken({
      id: user.id,
      role: user.role,
    });

    return {
      message: 'you are logined successfuly',
      token,
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  }
}
