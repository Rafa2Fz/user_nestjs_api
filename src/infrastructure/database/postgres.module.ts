import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address, User } from './entities';
import { UserRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address])],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class PostgresDatabase {}
