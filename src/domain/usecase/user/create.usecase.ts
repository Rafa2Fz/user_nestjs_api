import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../../infrastructure/database/repositories";
import { IUser } from "src/domain/entities";
type Input = Omit<IUser.Create, "id">;
@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    name,
    email,
    gender,
    date_of_birthday,
    marital_status,
    password,
  }: Input) {
    const user = await this.userRepository.create({
      name,
      email,
      gender,
      password,
      marital_status,
      date_of_birthday: new Date(date_of_birthday),
    });

    return user;
  }
}
