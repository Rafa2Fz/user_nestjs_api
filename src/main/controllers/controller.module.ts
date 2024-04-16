import { Module } from '@nestjs/common';
import { UserModule } from 'src/domain/usecase/user/user.module';
import { UserController } from './user.controller';

import { JwtAuthGuard } from '../guards';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationCreateModule } from 'src/domain/usecase/auth/authentication-create.module';
@Module({
  imports: [UserModule, AuthenticationCreateModule],
  controllers: [UserController, AuthenticationController],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class ControllerModule {}
