import 'reflect-metadata';
import CreateUserService from '@modules/users/services/CreateUserService';
import { AppError } from '@shared/errors/AppError';

const mockUserRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  findByName: jest.fn(),
  findByEmail: jest.fn(),
};

const mockRebbit = {
  publishInExchange: jest.fn(),
  start: jest.fn(),
};

const mockUserToUserViewMapper = {
  mapperUserToUserView: jest.fn(),
};
describe('Create User Service', () => {
  it('Must register the user', async () => {
    const createUserService = new CreateUserService(
      mockUserRepository,
      mockRebbit,
      mockUserToUserViewMapper,
    );

    mockUserRepository.findByEmail.mockReturnValue(null);
    mockRebbit.publishInExchange.mockReturnValue(true);
    mockUserRepository.create.mockReturnValue(true);

    await createUserService.execute({
      name: 'abc',
      lastName: 'cde',
      email: 'fgh@ermail.com',
      password: '123',
    });

    expect(mockUserRepository.create).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(mockRebbit.publishInExchange).toHaveBeenCalledTimes(1);
  });

  it('user with same email address', async () => {
    const newUser = {
      name: 'abc',
      lastName: 'cde',
      email: 'fgh@ermail.com',
      password: '123',
    };
    const createUserService = new CreateUserService(
      mockUserRepository,
      mockRebbit,
      mockUserToUserViewMapper,
    );

    mockUserRepository.findByEmail.mockReturnValue(newUser);

    expect(createUserService.execute(newUser)).rejects.toBeInstanceOf(AppError);
    expect(mockUserRepository.create).toHaveBeenCalledTimes(0);
    expect(mockRebbit.publishInExchange).toHaveBeenCalledTimes(0);
  });
});
