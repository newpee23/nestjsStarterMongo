import { Controller, Post, Request, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    const accessToken = await this.authService.login(req.user);
    return accessToken;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/loginCookie')
  async loginCookie(@Request() req, @Res({ passthrough: true }) res) {
    const { accessToken } = await this.authService.login(req.user);
    res.cookie('access_token', accessToken, {
      httpOnly: true,
    });
    return { message: 'Successfully logged in' };
  }
}
