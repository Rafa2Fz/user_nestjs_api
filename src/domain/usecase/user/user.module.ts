import { Module } from '@nestjs/common';
import { PostgresDatabase } from 'src/infrastructure/database/postgres.module';
import { CreateUserUseCase } from './create.usecase';

@Module({
  imports: [PostgresDatabase],
  providers: [CreateUserUseCase],
  exports: [CreateUserUseCase],
})
export class UserModule {}
