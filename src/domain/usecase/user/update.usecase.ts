import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/database/repositories';
import { IAddress, IUser } from 'src/domain/entities';
import { BcryptService } from 'src/infrastructure/services/bcrypt/bcrypt.service';
type Input = IUser.Update & { addresses: Array<IAddress.Update> };
@Injectable()
export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptography: BcryptService,
  ) {}

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
    const cryptoPass = await this.cryptography.encrypt({ plainText: password });
    const user = await this.userRepository.update({
      id,
      name,
      email,
      gender,
      password: cryptoPass,
      marital_status,
      date_of_birthday,
      addresses,
    });

    return user;
  }
}
