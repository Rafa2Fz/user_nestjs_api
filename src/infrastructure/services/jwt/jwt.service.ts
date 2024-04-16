import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generate(data) {
    return this.jwtService.sign(data?.payload, {
      secret: data.secret,
      expiresIn: data.expiresIn,
    });
  }

  async decode<T = any>({ token }) {
    const decode = jwtDecode<T>(token);
    return decode;
  }

  async validate({ token, secret }) {
    const decode = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    return decode;
  }
}
