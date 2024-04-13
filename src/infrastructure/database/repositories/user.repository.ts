import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from '../../../domain/entities';
import { ICreateUserRepository } from '../../../domain/repositories';
import { Repository } from 'typeorm';
import { User } from '../entities';
@Injectable()
export class UserRepository implements ICreateUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(input: IUser.Create): Promise<IUser> {
    try {
      const partialUser = new IUser(input);
      const user = this.userRepository.create({
        ...partialUser,
        created_at: new Date(),
      });

      await this.userRepository.save(user);
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }
}
