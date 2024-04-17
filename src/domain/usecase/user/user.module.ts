import { Module } from '@nestjs/common';
import { PostgresDatabase } from '../../../infrastructure/database/postgres.module';
import { CreateUserUseCase } from './create.usecase';
import { FindOneUserUseCase } from './findOne.usecase';
import { UpdateUserUseCase } from './update.usecase';
import { BcryptModule } from 'src/infrastructure/services/bcrypt/bcrypt.module';
import { FindAllUserUseCase } from './findAll.usecase';
import { DeleteUserUseCase } from './delete.usecase';

@Module({
  imports: [PostgresDatabase, BcryptModule],
  providers: [
    CreateUserUseCase,
    FindOneUserUseCase,
    UpdateUserUseCase,
    FindAllUserUseCase,
    DeleteUserUseCase,
  ],
  exports: [
    CreateUserUseCase,
    FindOneUserUseCase,
    UpdateUserUseCase,
    FindAllUserUseCase,
    DeleteUserUseCase,
  ],
})
export class UserModule {}
