import {
  Controller,
  Inject,
  Post,
  Body,
  Get,
  Param,
  Put,
  Query,
  Headers,
} from '@nestjs/common';
import { CreateUserUseCase } from 'src/domain/usecase/user/create.usecase';
import {
  CreateUserDto,
  PaginationHeaderOptions,
  UpdateUserDto,
  UserFinddAllQuery,
} from './dto/user.dto';
import { FindOneUserUseCase } from 'src/domain/usecase/user/findOne.usecase';
import { UpdateUserUseCase } from 'src/domain/usecase/user/update.usecase';
import { Public } from '../decorators/auth/public-routes.decorator';
import { FindAllUserUseCase } from 'src/domain/usecase/user/findAll.usecase';

@Controller('users')
export class UserController {
  constructor(
    @Inject(CreateUserUseCase)
    private readonly createUser: CreateUserUseCase,
    @Inject(FindOneUserUseCase)
    private readonly findOneUser: FindOneUserUseCase,
    @Inject(UpdateUserUseCase)
    private readonly updateUser: UpdateUserUseCase,
    @Inject(FindAllUserUseCase)
    private readonly findAllUser: FindAllUserUseCase,
  ) {}
  @Public()
  @Post()
  async create(@Body() body: CreateUserDto) {
    return await this.createUser.execute(body);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.findOneUser.execute(id);
  }
  @Get()
  async findAll(
    @Headers() headers: PaginationHeaderOptions,
    @Query() query?: UserFinddAllQuery,
  ) {
    const restPage = headers['rest-page'];
    const restLimit = headers['rest-limit'];
    return await this.findAllUser.execute({
      options: {},
      order: { order_field: query.order_field, type: query.type },
      filters: {
        email: query.email,
      },
    });
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return await this.updateUser.execute({ id, ...body });
  }
}
