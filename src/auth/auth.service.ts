import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { userLoginDto } from './dto/userLogin';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService,) { }

  async validateUser(email: string, password: string): Promise<userLoginDto> {
    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const result = user.toObject();
      return {
        email: result.email,
        userId: result._id
      };
    }

    return null;
  }

  async login(payload: userLoginDto) {
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
