import { IAddress, IUser } from '../entities';

export interface ICreateUser {
  create(input: ICreateUser.Input): Promise<ICreateUser.Output>;
}
export namespace ICreateUser {
  export type Input = IUser.Create & { addresses: IAddress.Create[] };
  export type Output = IUser;
}

export interface IFindOneUser {
  findOne(input: IFindOneUser.Input): Promise<IFindOneUser.Output>;
}
export namespace IFindOneUser {
  export type Input = string;
  export type Output = IUser | undefined;
}
export interface IUpdateUser {
  update(input: IUpdateUser.Input): Promise<IUpdateUser.Output>;
}
export namespace IUpdateUser {
  export type Input = Partial<IUser> & {
    id: string;
    addresses?: Array<IAddress>;
  };
  export type Output = IUser;
}
export interface IFindUser {
  find(input: IFindUser.Input): Promise<IFindUser.Output>;
}
export namespace IFindUser {
  export type Input = { email?: string };
  export type Output = IUser[];
}
export interface IFindUserWithPassword {
  findUserWithEmailAndPassword(
    input: IFindUserWithPassword.Input,
  ): Promise<IFindUserWithPassword.Output>;
}
export namespace IFindUserWithPassword {
  export type Input = string;
  export type Output = IUser | undefined;
}
