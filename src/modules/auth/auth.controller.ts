import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import {
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
} from './dtos';
import { AuthGuard } from '@nestjs/passport';

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

  @Post('refresh')
  @ApiOperation({ summary: 'refresh tokens' })
  async refresh(@Body('refreshToken') refreshToken: string) {
    const tokens = await this.authService.refreshToken(refreshToken);
    return {
      message: 'token updated',
      ...tokens,
    };
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'forgot password' })
  async forgotPassword(@Body() payload: ForgotPasswordDto) {
    return this.authService.forgotPassword(payload.email);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'reset password' })
  async resetPassword(@Body() payload: ResetPasswordDto) {
    return this.authService.resetPassword(payload.token, payload.newPassword);
  }

  @Post('logout')
  @ApiOperation({ summary: 'logout user' })
  async logout(@Res({ passthrough: true }) res: Response) {
    await this.authService.logout(res);
    return { message: 'you are logged out' };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    return this.authService.googleLogin(req.user, res);
  }
}
