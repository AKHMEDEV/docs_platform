import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dtos';
import { ApiOperation } from '@nestjs/swagger';
import { Protected, Roles } from 'src/decorators';
import { Role } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'users register' })
  @Post('register')
  @Protected(true)
  @Roles(Role.ADMIN, Role.USER)
  async register(@Body() payload: RegisterDto) {
    return await this.authService.register(payload);
  }

  @ApiOperation({ summary: 'users login' })
  @Post('login')
  @Protected(true)
  @Roles(Role.ADMIN, Role.USER)
  async login(@Body() payload: LoginDto) {
    return await this.authService.login(payload);
  }
}
