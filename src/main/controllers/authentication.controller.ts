import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';

import { LoginDto } from './dto/authentication.dto';
import { AuthenticationCreateUsecase } from 'src/domain/usecase/auth/authentication-create.usecase';
import { Public } from '../decorators/auth/public-routes.decorator';

@Public()
@Controller('auth')
export class AuthenticationController {
  constructor(
    @Inject(AuthenticationCreateUsecase)
    private readonly authCreateAuthentication: AuthenticationCreateUsecase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDto) {
    const auth = await this.authCreateAuthentication.execute({
      email: body.email,
      password: body.password,
    });

    return auth;
  }
}
