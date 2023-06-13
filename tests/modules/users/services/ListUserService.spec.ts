import 'reflect-metadata';
import ListUserService from '@modules/users/services/ListUserService';

const mockUserRepository = {
  create: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  findByEmail: jest.fn(),
  update: jest.fn(),
};

describe('List User Service', () => {
  it('should return empty list ', async () => {
    const listUserService = new ListUserService(mockUserRepository);
    mockUserRepository.findAll.mockReturnValue([]);

    const result = await listUserService.execute();

    expect(mockUserRepository.findAll).toHaveBeenCalledTimes(1);
    expect(result.length).toEqual(0);
  });

  it('Returns a list of users ', async () => {
    const newUser = [
      {
        name: 'abc',
        lastName: 'cde',
        email: 'fgh@ermail.com',
        password: '123',
      },
      {
        name: 'abc1',
        lastName: 'zwr',
        email: 'zwr@ermail.com',
        password: '123',
      },
    ];
    const listUserService = new ListUserService(mockUserRepository);
    const results = await listUserService.execute();

    mockUserRepository.findAll.mockReturnValue(newUser);

    expect(mockUserRepository.findAll).toHaveBeenCalledTimes(1);
    expect(results).not.toBeNull();
  });
});
