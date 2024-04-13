import { randomUUID } from "crypto";

type UserProps = Omit<IUser, "id" | "created_at" | "updated_at"> & {
  id?: string;
};
export class IUser {
  constructor({ id, ...props }: UserProps) {
    this.id = id ? id : randomUUID();

    Object.assign(this, props);
  }
  id: string;
  name: string;
  gender: string;
  date_of_birthday: Date;
  marital_status: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export namespace IUser {
  export type Create = Omit<IUser, "id" | "created_at" | "updated_at"> & {
    id?: string;
  };
}
