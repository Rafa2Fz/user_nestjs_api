import { IAddress } from 'src/domain/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
@Entity('addresses')
export class Address implements IAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  address: string;
  @Column()
  cep: string;
  @Column()
  number: string;
  @Column()
  district: string;
  @Column()
  state: string;
  @Column()
  city: string;
  @Column()
  complement: string;
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    generatedType: 'VIRTUAL',
  })
  created_at: Date;
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    generatedType: 'VIRTUAL',
  })
  updated_at: Date;

  @ManyToMany(() => User, (user) => user.addresses)
  users: User[];
}
