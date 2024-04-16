import { Module } from '@nestjs/common';
import { PostgresDatabase } from '../../../infrastructure/database/postgres.module';
import { AuthenticationCreateUsecase } from './authentication-create.usecase';
import { BcryptModule } from 'src/infrastructure/services/bcrypt/bcrypt.module';
import { JwtTokenModule } from 'src/infrastructure/services/jwt';

@Module({
  imports: [PostgresDatabase, JwtTokenModule, BcryptModule],
  providers: [AuthenticationCreateUsecase],
  exports: [AuthenticationCreateUsecase],
})
export class AuthenticationCreateModule {}
