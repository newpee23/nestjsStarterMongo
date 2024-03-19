import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { userLoginDto } from '../dto/userLogin';

@Injectable()
export class JwtCookieStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET'), // Use the secret from environment variables
            ignoreExpiration: false,
        });
    }

    async validate(payload: userLoginDto) {
        // This payload will be the decrypted token payload you provided when signing the token
        return { userId: payload.userId, email: payload.email };
    }
}
