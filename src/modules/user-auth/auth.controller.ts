import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dtos';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'users register' })
  @Post('register')
  async register(@Body() payload: RegisterDto) {
    return await this.authService.register(payload);
  }

  @ApiOperation({ summary: 'users login' })
  @Post('login')
  async login(
    @Body() payload: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.login(payload, res);
  }
}
