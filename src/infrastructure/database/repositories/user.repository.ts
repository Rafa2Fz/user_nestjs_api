import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IAddress, IUser } from '../../../domain/entities';
import {
  ICreateUser,
  IDeleteUser,
  IFindOneUser,
  IFindUser,
  IFindUserWithPassword,
  IUpdateUser,
} from '../../../domain/repositories';
import { DeleteResult, Repository } from 'typeorm';
import { Address, User } from '../entities';
import { paginate } from 'nestjs-typeorm-paginate';
@Injectable()
export class UserRepository
  implements
    ICreateUser,
    IFindOneUser,
    IUpdateUser,
    IFindUser,
    IFindUserWithPassword,
    IDeleteUser
{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}
  async create({ addresses, ...userData }: ICreateUser.Input): Promise<IUser> {
    try {
      const partialUser = new IUser(userData);
      const user = this.userRepository.create({
        ...partialUser,
        created_at: new Date(),
      });
      if (addresses.length > 0) {
        user.addresses = [];
        for (const address of addresses) {
          const partialAddress = new IAddress(address);
          user.addresses.push(
            this.addressRepository.create({
              ...partialAddress,
              created_at: new Date(),
            }),
          );
        }
      }

      await this.userRepository.save(user);
      return user;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findOne(input: IFindOneUser.Input): Promise<IUser> {
    try {
      return await this.userRepository.findOne({
        where: { id: input },
        select: ['id', 'name', 'gender', 'marital_status', 'date_of_birthday'],
        relations: ['addresses'],
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async find({
    order,
    options,
    filters,
  }: IFindUser.Input): Promise<IFindUser.Output> {
    try {
      const conditions = {};

      if (filters.email) {
        conditions['email'] = filters.email;
      }
      const users = this.userRepository
        .createQueryBuilder('user')
        .select([
          'user.id',
          'user.name',
          'user.date_of_birthday',
          'user.gender',
          'user.marital_status',
        ])
        .leftJoinAndSelect('user.addresses', 'addresses')
        .where(conditions);

      if (order) {
        users.orderBy(
          order.order_field ? order.order_field : 'name',
          order.type ? order.type : 'ASC',
        );
      }
      if (options.restMode === 'list') {
        return await users.getMany();
      }

      return await paginate<IUser>(users, {
        limit: options.restLimit,
        page: options.restPage,
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async update({ addresses, ...userData }: IUpdateUser.Input): Promise<IUser> {
    try {
      const user = this.userRepository.create({
        ...userData,
        updated_at: new Date(),
      });
      user.addresses = [];
      if (Array.isArray(addresses) && addresses.length > 0) {
        for (const address of addresses) {
          if (address.id) {
            user.addresses.push(
              this.addressRepository.create({
                ...address,
                updated_at: new Date(),
              }),
            );
          }
          const partialAddress = new IAddress({
            ...address,
          });
          user.addresses.push(
            this.addressRepository.create({
              ...partialAddress,
              created_at: new Date(),
            }),
          );
        }
      }

      await this.userRepository.save(user);
      return user;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
  async findUserWithEmailAndPassword(
    email: string,
  ): Promise<IUser | undefined> {
    // Use o método createQueryBuilder para construir uma consulta SQL personalizada
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.id')
      .addSelect('user.email')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    return user;
  }

  async delete(input: string): Promise<DeleteResult> {
    try {
      return await this.userRepository.delete({ id: input });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
