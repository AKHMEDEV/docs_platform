import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
  import { Role } from '@prisma/client';
  @Injectable()
  export class JwtHelper {
    constructor(private jwt: JwtService) {}
  
    async generateToken(payload: { id: string; role: Role }) {
      const token = await this.jwt.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: process.env.ACCESS_TOKEN_TIME
          ? parseInt(process.env.ACCESS_TOKEN_TIME)
          : '3600',
      });
  
      return { token };
    }
  
    async verifyToken(token: string) {
      try {
        const decodedData = await this.jwt.verifyAsync(token, {
          secret: process.env.ACCESS_TOKEN_SECRET,
        });
        return decodedData;
      } catch (error) {
        if (error instanceof TokenExpiredError) {
          throw new ForbiddenException('Token vaqti tugagan');
        }
  
        if (error instanceof JsonWebTokenError) {
          throw new BadRequestException('Jwt token formati xato');
        }
  
        throw new InternalServerErrorException('Server xatosi');
      }
    }
  }
  