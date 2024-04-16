import { BadRequestException, Injectable } from '@nestjs/common';

import { UserRepository } from 'src/infrastructure/database/repositories';

import { BcryptService } from 'src/infrastructure/services/bcrypt/bcrypt.service';
import { JwtTokenService } from 'src/infrastructure/services/jwt';

@Injectable()
export class AuthenticationCreateUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtTokenService,
    private readonly cryptography: BcryptService,
  ) {}

  async execute({ email, password }) {
    const user = await this.userRepository.findUserWithEmailAndPassword(email);

    if (!user) {
      throw new BadRequestException('Email or password is incorrect!');
    }

    const confirmPassword = await this.cryptography.compare({
      plainText: password,
      hash: user.password,
    });

    if (!confirmPassword) {
      throw new BadRequestException('Email or password is incorrect!');
    }

    const accessToken = await this.jwtService.generate({
      payload: { user: { id: user.id, email: user.email } },
      expiresIn: process.env.JWT_EXPIRATION_TIME,
      secret: process.env.JWT_SECRET,
    });

    return { accessToken };
  }
}
