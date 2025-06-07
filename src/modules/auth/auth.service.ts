import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcryptjs';
import { JwtHelper } from 'src/helpers/jwt.helper';
import { PrismaService } from 'src/prisma';
import { MailService } from 'src/common/nodemailler';
import { Response } from 'express';
import { LoginDto, RegisterDto } from './dtos';

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
      throw new ConflictException('user already exists try another email');
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
      subject: 'TechDocs saytiga muvaffaqiyatli royxatdan otdingiz!',
      html: `
        <p>Salom <b>${user.username}</b>!</p>
        <p>TechDocs saytimizga muvaffaqiyatli royxatdan otdingiz.</p>
        <p>Endi siz barcha dokumentatsiyalarni korishingiz, izoh qoldirishingiz va koproq bilimga ega bolishingiz mumkin.</p>
        <p>Hush kelibsiz!</p>
      `,
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

  async login(payload: LoginDto, res: Response) {
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

    const { accessToken, refreshToken } = await this.jwtHelper.generateTokens({
      id: user.id,
      role: user.role,
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: refreshToken },
    });

    res.json({
      message: 'you are logined successfully',
      accessToken,
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  }

  async refreshToken(oldRefreshToken: string) {
    const payload = await this.jwtHelper.verifyRefreshToken(oldRefreshToken);

    const user = await this.prisma.user.findUnique({
      where: { id: payload.id },
    });
    if (!user || user.refreshToken !== oldRefreshToken) {
      throw new ForbiddenException('invalid refresh token');
    }

    const tokens = await this.jwtHelper.generateTokens({
      id: user.id,
      role: user.role,
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken },
    });

    return tokens;
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) throw new NotFoundException('user not found');

    const resetToken = await this.jwtHelper.generateResetToken({ id: user.id });

    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

    await this.mailService.sendMail({
      to: email,
      subject: 'password reset',
      html: `
        <p>Salom <b>${user.username}</b>!</p>
        <p>Parolingizni tiklash uchun quyidagi havolaga o'ting:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Link 15 daqiqada tugaydi.</p>
      `,
    });

    return { message: 'Reset link yuborildi' };
  }

  async resetPassword(token: string, newPassword: string) {
    const payload = await this.jwtHelper.verifyResetToken(token);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: payload.id },
      data: {
        password: hashedPassword,
        refreshToken: null,
      },
    });

    return { message: 'password updated, please log in again' };
  }

  async logout(res: Response) {
    const refreshToken = res.req.cookies?.refresh_token;
    if (!refreshToken) return;

    try {
      const payload = await this.jwtHelper.verifyRefreshToken(refreshToken);

      await this.prisma.user.update({
        where: { id: payload.id },
        data: { refreshToken: null },
      });

      res.clearCookie('refresh_token');
    } catch (error) {
      res.clearCookie('refresh_token');
    }
  }
}
