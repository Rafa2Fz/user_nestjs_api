import { Injectable } from '@nestjs/common';

import { UserRepository } from '../../../infrastructure/database/repositories';
import { IUser } from 'src/domain/entities';
type Input = {
  options: { restMode: string; restLimit: number; restPage: number };
  order: { order_field: string; type: 'ASC' | 'DESC' };
  filters: { email: string };
};

@Injectable()
export class FindAllUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: Input): Promise<IUser[] | undefined> {
    return await this.userRepository.find(input);
  }
}
