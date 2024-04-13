import { CreateUserUseCase } from '../../../src/domain/usecase/user/create.usecase';
import { UserRepository } from '../../../src/infrastructure/database/repositories';
import { userMock } from '../../mocks';
import { mock, MockProxy } from 'jest-mock-extended';

describe('CreateUserService', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepository: MockProxy<UserRepository>;

  beforeAll(() => {
    userRepository = mock();
    userRepository.create.mockResolvedValue(userMock);
  });

  beforeEach(async () => {
    createUserUseCase = new CreateUserUseCase(userRepository);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', async () => {
    expect(createUserUseCase).toBeDefined();
  });
  it('should be create a new user', async () => {
    const createdUser = await createUserUseCase.execute(userMock);
    expect(createdUser.id.length).toBe(36);
    expect(createdUser.name).toEqual(userMock.name);
    expect(createdUser.email).toEqual(userMock.email);
    expect(createdUser.gender).toEqual(userMock.gender);
    expect(createdUser.password).toEqual(userMock.password);
    expect(createdUser.marital_status).toEqual(userMock.marital_status);
    expect(createdUser.date_of_birthday).toEqual(userMock.date_of_birthday);
  });
});
