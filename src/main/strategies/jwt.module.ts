import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt';
import { PostgresDatabase } from 'src/infrastructure/database/postgres.module';

@Module({
  imports: [PostgresDatabase],
  providers: [JwtStrategy],
})
export class JwtStrategyModule {}
