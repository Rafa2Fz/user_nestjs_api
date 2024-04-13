import { IUser } from '../entities';

export interface ICreateUserRepository {
  create(
    input: ICreateUserRepository.Input,
  ): Promise<ICreateUserRepository.Output>;
}
export namespace ICreateUserRepository {
  export type Input = IUser.Create;
  export type Output = IUser;
}
