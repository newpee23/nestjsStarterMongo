import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { userLoginDto } from 'src/auth/dto/userLogin';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  create(@Body() registerDto: RegisterDto) {
    return this.userService.create(registerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Req() req: Request) {
    
    const user = req.user as userLoginDto;
    const result = await this.userService.findByEmail(user.email);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profileCookie')
  async getProfileCookie(@Req() req: Request) {

    const user = req.user as userLoginDto;
    const result = await this.userService.findByEmail(user.email);
    return result;
  }
}
