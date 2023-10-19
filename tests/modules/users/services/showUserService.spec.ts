import 'reflect-metadata';
import ShowUserService from '@modules/users/services/ShowUserService';

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

describe('Show User Service', () => {
  beforeAll(() => {
    mockUserRepository.findAll.mockReset();
    mockUserRepository.findOne.mockReset();
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

    const userViewModel = {
      id: 'any id',
      name: 'any name',
      lastName: 'any lastName',
      email: 'any email',
      password: '123',
      active: true,
      creationDate: new Date(),
      updateDate: new Date(),
    };

    const showUserService = new ShowUserService(
      mockUserRepository,
      mockUserToUserViewMapper,
    );
    mockUserRepository.findOne.mockReturnValue(user);
    mockUserToUserViewMapper.mapperUserToUserView.mockReturnValue(
      userViewModel,
    );

    const result = await showUserService.execute('1');

    expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockUserToUserViewMapper.mapperUserToUserView).toHaveBeenCalledTimes(
      1,
    );
    expect(result).toEqual(userViewModel);
  });

  it('should return empty user', async () => {
    const showUserService = new ShowUserService(
      mockUserRepository,
      mockUserToUserViewMapper,
    );
    mockUserRepository.findOne.mockReturnValue(undefined);
    const results = await showUserService.execute('2');

    expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockUserToUserViewMapper.mapperUserToUserView).toHaveBeenCalledTimes(
      0,
    );
    expect(results).toBe(null);
  });
});
