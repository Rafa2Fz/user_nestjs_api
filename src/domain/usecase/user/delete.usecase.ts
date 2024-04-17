import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/database/repositories';
import { BcryptService } from 'src/infrastructure/services/bcrypt/bcrypt.service';
type Input = string;
@Injectable()
export class DeleteUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptography: BcryptService,
  ) {}

  async execute(id: Input) {
    const user = await this.userRepository.delete(id);

    return user;
  }
}
