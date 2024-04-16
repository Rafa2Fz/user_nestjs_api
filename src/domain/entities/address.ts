import { randomUUID } from 'crypto';

type AddressProps = Omit<IAddress, 'id' | 'created_at' | 'updated_at'> & {
  id?: string;
};
export class IAddress {
  constructor({ id, ...props }: AddressProps) {
    this.id = id ? id : randomUUID();

    Object.assign(this, props);
  }
  id: string;
  address: string;
  cep: string;
  number: string;
  district: string;
  state: string;
  city: string;
  complement?: string;
}

export namespace IAddress {
  export type Create = Omit<IAddress, 'id' | 'created_at' | 'updated_at'> & {
    id?: string;
  };
  export type Update = IAddress;
}
