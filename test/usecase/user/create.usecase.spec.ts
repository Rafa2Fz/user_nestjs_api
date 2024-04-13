import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from '../../../src/domain/usecase/user/create.usecase';
import { UserRepository } from '../../../src/infrastructure/database/repositories';
import { userMock } from '../../mocks';

const mockUserRepository = {
  create: jest.fn().mockReturnValue(userMock),
};

describe('UserService', () => {
  let createUserUseCase: CreateUserUseCase;
  beforeEach(async () => {
    const userModule: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        { provide: UserRepository, useValue: mockUserRepository },
      ],
    }).compile();

    createUserUseCase = userModule.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it('should be defined', async () => {
    expect(createUserUseCase).toBeDefined();
  });
});
