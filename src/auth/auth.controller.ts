import { Controller, Post, Req, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Request, Response } from 'express';
import { userLoginDto } from './dto/userLogin';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req: Request) {
    
    const user = req.user as userLoginDto;
    const accessToken = await this.authService.login(user);
    return accessToken;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/loginCookie')
  async loginCookie(@Req() req: Request, @Res({ passthrough: true }) res: Response) {

    const user = req.user as userLoginDto;
    const { accessToken } = await this.authService.login(user);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
    });
    return { message: 'Login successfully' };
  }
}
