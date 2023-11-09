import 'reflect-metadata';
import ListUserService from '@modules/users/services/ListUserService';

const mockUserRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  findByName: jest.fn(),
  findByEmail: jest.fn(),
};

const mockUserToUserViewMapper = {
  mapperUserToUserView: jest.fn(),
};

describe('List User Service', () => {
  it('should return empty list ', async () => {
    const listUserService = new ListUserService(
      mockUserRepository,
      mockUserToUserViewMapper,
    );
    mockUserRepository.findAll.mockReturnValue([]);

    const result = await listUserService.execute();

    expect(mockUserRepository.findAll).toHaveBeenCalledTimes(1);
    expect(mockUserToUserViewMapper.mapperUserToUserView).toHaveBeenCalledTimes(
      0,
    );
    expect(result.length).toEqual(0);
  });

  it('Returns a list of users ', async () => {
    const newUsers = [
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
    const listUserService = new ListUserService(
      mockUserRepository,
      mockUserToUserViewMapper,
    );
    mockUserRepository.findAll.mockReturnValue(newUsers);

    const results = await listUserService.execute();

    expect(mockUserRepository.findAll).toHaveBeenCalledTimes(1);
    expect(mockUserToUserViewMapper.mapperUserToUserView).toHaveBeenCalledTimes(
      2,
    );
    expect(results).not.toBeNull();
  });
});
