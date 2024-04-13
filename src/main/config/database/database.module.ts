import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

export const database = 'user_api';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 3306,
      username: 'user_api',
      password: 'user_api',
      database,
      entities: [
        __dirname + '/../../../infrastructure/database/**/*.entity{.ts,.js}',
      ],
      synchronize: false,
    }),
  ],
})
export class DatabaseModule {}
