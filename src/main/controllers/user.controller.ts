import { Controller, Inject, Post, Body } from "@nestjs/common";
import { CreateUserUseCase } from "src/domain/usecase/user/create.usecase";
import { CreateUserDto } from "./dto/user.dto";

@Controller("user")
export class UserController {
  constructor(
    @Inject(CreateUserUseCase)
    private readonly createUser: CreateUserUseCase
  ) {}

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.createUser.execute(body);
  }
}
