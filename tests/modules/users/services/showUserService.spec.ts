import 'reflect-metadata';
import ShowUserService from '@modules/users/services/ShowUserService';

const mockUserRepository = {
  create: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  findByEmail: jest.fn(),
  update: jest.fn(),
};

describe('Show User Service', () => {
  beforeAll(() => {
    mockUserRepository.findAll.mockReset();
    mockUserRepository.findById.mockReset();
    mockUserRepository.create.mockReset();
    mockUserRepository.findByEmail.mockReset();
    mockUserRepository.update.mockReset();
    mockUserRepository.delete.mockReset();
  });
  it('should return the user ', async () => {
    const user = {
      name: 'abc',
      lastName: 'cde',
      email: 'fgh@ermail.com',
      password: '123',
    };
    const showUserService = new ShowUserService(mockUserRepository);
    mockUserRepository.findById.mockReturnValue(user);

    const result = await showUserService.execute('1');

    expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
    expect(result).toEqual(user);
  });

  it('should return empty user', async () => {
    const showUserService = new ShowUserService(mockUserRepository);
    mockUserRepository.findById.mockReturnValue(undefined);
    const results = await showUserService.execute('2');

    expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
    expect(results).toBe(undefined);
  });
});
