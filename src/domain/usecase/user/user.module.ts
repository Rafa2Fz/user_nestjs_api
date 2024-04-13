import { Module } from '@nestjs/common';
import { PostgresDatabase } from '../../../infrastructure/database/postgres.module';
import { CreateUserUseCase } from './create.usecase';
import { FindOneUserUseCase } from './findOne.usecase';

@Module({
  imports: [PostgresDatabase],
  providers: [CreateUserUseCase, FindOneUserUseCase],
  exports: [CreateUserUseCase, FindOneUserUseCase],
})
export class UserModule {}
