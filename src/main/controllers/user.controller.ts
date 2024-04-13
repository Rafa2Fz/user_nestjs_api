import { Controller, Inject, Post, Body, Get, Param } from '@nestjs/common';
import { CreateUserUseCase } from 'src/domain/usecase/user/create.usecase';
import { CreateUserDto } from './dto/user.dto';
import { FindOneUserUseCase } from 'src/domain/usecase/user/findOne.usecase';

@Controller('user')
export class UserController {
  constructor(
    @Inject(CreateUserUseCase)
    private readonly createUser: CreateUserUseCase,
    @Inject(FindOneUserUseCase)
    private readonly findOneUser: FindOneUserUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    return await this.createUser.execute(body);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.findOneUser.execute(id);
  }
}
