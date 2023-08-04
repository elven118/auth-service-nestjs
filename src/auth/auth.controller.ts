import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() user: { email: string; password: string }) {
    this.authService.createUser(user);
    return {};
  }

  @Post('login')
  async login(@Body() user: { email: string; password: string }) {
    const existUser = await this.authService.user({
      email: user.email,
    });
    return { success: existUser ? true : false };
  }
}
