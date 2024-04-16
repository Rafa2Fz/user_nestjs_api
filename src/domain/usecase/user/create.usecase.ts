import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/database/repositories';
import { IAddress, IUser } from 'src/domain/entities';
import { BcryptService } from 'src/infrastructure/services/bcrypt/bcrypt.service';
type Input = Omit<IUser.Create, 'id'> & { addresses: IAddress.Create[] };
@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptography: BcryptService,
  ) {}

  async execute({
    name,
    email,
    gender,
    marital_status,
    password,
    addresses,
    ...input
  }: Input) {
    const date_of_birthday = new Date(input.date_of_birthday);
    const encryptPass = await this.cryptography.encrypt({
      plainText: password,
    });
    const user = await this.userRepository.create({
      name,
      email,
      gender,
      password: encryptPass,
      marital_status,
      date_of_birthday,
      addresses,
    });

    let isBirthday = false;
    const today = new Date();
    const currentYear = today.getFullYear();
    const nextBirthday = new Date(
      currentYear,
      date_of_birthday.getMonth(),
      date_of_birthday.getDate(),
    );

    if (
      today.getMonth() === date_of_birthday.getMonth() &&
      today.getDate() === date_of_birthday.getDate()
    ) {
      isBirthday = true;
    }
    if (today > nextBirthday) {
      nextBirthday.setFullYear(currentYear + 1);
    }
    const oneDay = 1000 * 60 * 60 * 24;
    const milisecondsTotalDays = nextBirthday.getTime() - today.getTime();
    const days = Math.round(milisecondsTotalDays / oneDay);

    return { user, isBirthday, days };
  }
}
