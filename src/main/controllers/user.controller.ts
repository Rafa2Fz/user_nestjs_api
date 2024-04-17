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
  Delete,
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
import { DeleteUserUseCase } from 'src/domain/usecase/user/delete.usecase';

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
    @Inject(DeleteUserUseCase)
    private readonly deleteUser: DeleteUserUseCase,
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
    const restPage = headers['rest-page'] ? Number(headers['rest-page']) : 1;
    const restLimit = headers['rest-limit'] ? Number(headers['rest-limit']) : 5;
    const restMode = headers['rest-mode'];
    return await this.findAllUser.execute({
      options: { restPage, restLimit, restMode },
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
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.deleteUser.execute(id);
  }
}
