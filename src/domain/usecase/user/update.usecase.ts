import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/database/repositories';
import { IAddress, IUser } from 'src/domain/entities';
type Input = IUser.Update & { addresses: Array<IAddress.Update> };
@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    id,
    name,
    email,
    gender,
    marital_status,
    password,
    addresses,
    ...input
  }: Input) {
    const date_of_birthday = new Date(input.date_of_birthday);

    const user = await this.userRepository.update({
      id,
      name,
      email,
      gender,
      password,
      marital_status,
      date_of_birthday,
      addresses,
    });

    return user;
  }
}
