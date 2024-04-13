import { FindOneUserUseCase } from '../../../src/domain/usecase/user/findOne.usecase';
import { UserRepository } from '../../../src/infrastructure/database/repositories';
import { userMock } from '../../mocks';
import { mock, MockProxy } from 'jest-mock-extended';

describe('FindOneUserService', () => {
  let findOneUserUseCase: FindOneUserUseCase;
  let userRepository: MockProxy<UserRepository>;

  beforeAll(() => {
    userRepository = mock();
    userRepository.findOne.mockResolvedValue({
      ...userMock,
      id: '42bb371a-29f9-4e71-9b8b-1cc8ebc8382e',
    });
  });

  beforeEach(async () => {
    findOneUserUseCase = new FindOneUserUseCase(userRepository);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', async () => {
    expect(findOneUserUseCase).toBeDefined();
  });
  it('should be find user by id', async () => {
    const findOneUser = await findOneUserUseCase.execute(
      '42bb371a-29f9-4e71-9b8b-1cc8ebc8382e',
    );
    expect(findOneUser.id.length).toBe(36);
    expect(findOneUser.name).toEqual(userMock.name);
    expect(findOneUser.email).toEqual(userMock.email);
    expect(findOneUser.gender).toEqual(userMock.gender);
    expect(findOneUser.password).toEqual(userMock.password);
    expect(findOneUser.marital_status).toEqual(userMock.marital_status);
    expect(findOneUser.date_of_birthday).toEqual(userMock.date_of_birthday);
  });
});
