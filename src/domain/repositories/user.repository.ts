import { Pagination } from 'nestjs-typeorm-paginate';
import { IAddress, IUser } from '../entities';
import { DeleteResult } from 'typeorm';

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
  export type Input = {
    options: { restMode: string; restLimit: number; restPage: number };
    order: { order_field: string; type: 'ASC' | 'DESC' };
    filters: { email: string };
  };
  export type Output = IUser[] | Pagination<IUser>;
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

export interface IDeleteUser {
  delete(input: IDeleteUser.Input): Promise<IDeleteUser.Output>;
}
export namespace IDeleteUser {
  export type Input = string;
  export type Output = DeleteResult;
}
