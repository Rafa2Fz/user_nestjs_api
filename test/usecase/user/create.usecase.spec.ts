import { before } from 'node:test';
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
    jest.setSystemTime(new Date('04/13/2024'));
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
    const createdUser = await createUserUseCase.execute({
      ...userMock,
      addresses: [],
    });
    expect(createdUser.user.id.length).toBe(36);
    expect(createdUser.user.name).toEqual(userMock.name);
    expect(createdUser.user.email).toEqual(userMock.email);
    expect(createdUser.user.gender).toEqual(userMock.gender);
    expect(createdUser.user.password).toEqual(userMock.password);
    expect(createdUser.user.marital_status).toEqual(userMock.marital_status);
    expect(createdUser.user.date_of_birthday).toEqual(
      userMock.date_of_birthday,
    );
  });
  it('should be verifiy if is birthday day', async () => {
    const createdUser = await createUserUseCase.execute({
      ...userMock,
      addresses: [],
    });
    expect(createdUser.isBirthday).toBe(true);
  });

  it('should be verify missings days for birthday', async () => {
    const createdUser = await createUserUseCase.execute({
      ...userMock,
      date_of_birthday: new Date('04/12/1993'),
    });
    expect(createdUser.days).toEqual(363);
  });
});
