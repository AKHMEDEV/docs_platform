import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
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
      request.role = Role.USER;
      return true;
    }

    const token = request.headers['authorization'];

    if (!token || !token.startsWith('Bearer')) {
      throw new BadRequestException('please send Bearer token ✌');
    }

    const data = await this.jwtHelper.verifyToken(token.split(' ')[1]);

    request.role = data.role;
    request.userId = data.id;
    return true;
  }
}
