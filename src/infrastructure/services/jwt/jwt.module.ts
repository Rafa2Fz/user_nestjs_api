import { Module } from '@nestjs/common';
import { JwtModule as Jwt } from '@nestjs/jwt';
import { JwtTokenService } from './jwt.service';

@Module({
  imports: [
    Jwt.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  exports: [JwtTokenService],
  providers: [JwtTokenService],
})
export class JwtTokenModule {}
