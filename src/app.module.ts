import { Module } from '@nestjs/common';
import { ControllerModule } from './main/controllers/controller.module';
import { DatabaseModule } from './main/config/database/database.module';
import { JwtStrategyModule } from './main/strategies';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    DatabaseModule,
    ControllerModule,
    JwtStrategyModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
})
export class AppModule {}
