import { Controller, Post, Body, Get, UseGuards, Request} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { userLoginDto } from 'src/auth/dto/userLogin';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  create(@Body() registerDto: RegisterDto) {
    return this.userService.create(registerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Request() req) {
    const user: userLoginDto = req.user;
    const result = await this.userService.findByEmail(user.email);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profileCookie')
  async getProfileCookie(@Request() req) {
    const user: userLoginDto = req.user;
    const result = await this.userService.findByEmail(user.email);
    return result;
  }
}
