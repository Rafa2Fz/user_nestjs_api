import { IUser } from 'src/domain/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  gender: string;
  @Column()
  date_of_birthday: Date;
  @Column()
  marital_status: string;
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
}
