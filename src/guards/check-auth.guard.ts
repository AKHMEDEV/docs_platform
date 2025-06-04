import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { PROTECTED_KEY } from 'src/decorators';
import { JwtHelper } from 'src/helpers';

@Injectable()
export class CheckAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtHelper: JwtHelper,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isProtected = this.reflector.getAllAndOverride<boolean>(
      PROTECTED_KEY,
      [context.getHandler(), context.getClass()],
    );

    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    if (!isProtected) {
      request.user = {
        id: null,
        role: Role.USER,
      };
      return true;
    }

    const authHeader =
      request.headers['authorization'] || request.headers['Authorization'];

    if (!authHeader || typeof authHeader !== 'string') {
      throw new BadRequestException('authorization header is missing');
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw new BadRequestException('bearer token yuboring');
    }

    const token = authHeader.split(' ')[1];

    try {
      const data = await this.jwtHelper.verifyAccessToken(token);

      request.user = {
        id: data.id,
        role: data.role,
      };

      return true;
    } catch (error) {
      throw new UnauthorizedException('xato token');
    }
  }
}
