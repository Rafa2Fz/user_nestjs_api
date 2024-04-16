import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from 'src/infrastructure/database/repositories';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any) {
    const users = await this.userRepository.find({
      email: payload.email,
    });
    const user = users[0];
  
    if (!user) {
      throw new UnauthorizedException({
        message: 'User or password invalid!',
      });
    }
    return user;
  }
}
