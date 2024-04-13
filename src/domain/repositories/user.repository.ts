import { IUser } from '../entities';

export interface ICreateUser {
  create(input: ICreateUser.Input): Promise<ICreateUser.Output>;
}
export namespace ICreateUser {
  export type Input = IUser.Create;
  export type Output = IUser;
}

export interface IFindOneUser {
  findOne(input: IFindOneUser.Input): Promise<IFindOneUser.Output>;
}
export namespace IFindOneUser {
  export type Input = string;
  export type Output = IUser;
}
