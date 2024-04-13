import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from '../../../domain/entities';
import { ICreateUser, IFindOneUser } from '../../../domain/repositories';
import { Repository } from 'typeorm';
import { User } from '../entities';
@Injectable()
export class UserRepository implements ICreateUser, IFindOneUser {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(input: ICreateUser.Input): Promise<IUser> {
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

  async findOne(input: IFindOneUser.Input): Promise<IUser> {
    try {
      return await this.userRepository.findOne({ where: { id: input } });
    } catch (err) {
      throw new Error(err);
    }
  }
}
