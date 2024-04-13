import { Injectable } from '@nestjs/common';

import { UserRepository } from '../../../infrastructure/database/repositories';
import { IUser } from 'src/domain/entities';

@Injectable()
export class FindOneUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<IUser | null> {
    return await this.userRepository.findOne(id);
  }
}
