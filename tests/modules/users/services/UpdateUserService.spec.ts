import 'reflect-metadata';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import { AppError } from '@shared/errors/AppError';
import { IUpdateUser } from '@modules/users/domain/Request/IUpdateUsers';

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

describe('Update User Service', () => {
  beforeAll(() => {
    mockUserRepository.findAll.mockReset();
    mockUserRepository.findOne.mockReset();
    mockUserRepository.create.mockReset();
    mockUserRepository.findByEmail.mockReset();
    mockUserRepository.update.mockReset();
    mockUserRepository.delete.mockReset();
  });

  it('must update user successfully', async () => {
    const userToBeUpdated = {
      id: '1',
      name: 'abcd',
      lastName: 'cder',
      email: 'fghi@ermail.com',
      password: '123',
    } as IUpdateUser;

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

    const updateUserService = new UpdateUserService(
      mockUserRepository,
      mockUserToUserViewMapper,
    );
    mockUserRepository.findOne.mockReturnValue(userToBeUpdated);
    mockUserRepository.findByEmail.mockReturnValue(userToBeUpdated);
    mockUserRepository.update.mockReturnValue(userToBeUpdated);
    mockUserToUserViewMapper.mapperUserToUserView.mockReturnValue(
      userViewModel,
    );

    await updateUserService.execute(userToBeUpdated);

    expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.update).toHaveBeenCalledTimes(1);
    expect(mockUserToUserViewMapper.mapperUserToUserView).toHaveBeenCalledTimes(
      1,
    );
  });

  it('must not update non-existent user', async () => {
    const userToBeUpdated = {
      id: '1',
      name: 'abcd',
      lastName: 'cder',
      email: 'fghi@ermail.com',
      password: '123',
    } as IUpdateUser;

    const updateUserService = new UpdateUserService(
      mockUserRepository,
      mockUserToUserViewMapper,
    );

    mockUserRepository.findOne.mockReturnValue(undefined);

    await updateUserService.execute(userToBeUpdated).catch(e => {
      expect(e).toBeInstanceOf(AppError);
      expect(e).toMatchObject({
        message: 'User does not exist',
      });
    });
    expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(0);
    expect(mockUserRepository.update).toHaveBeenCalledTimes(0);
  });
  it('should not update user with different id', async () => {
    const userToBeUpdated = {
      id: '1',
      name: 'abcd',
      lastName: 'cder',
      email: 'fghi@ermail.com',
      password: '123',
    } as IUpdateUser;

    const updateUserService = new UpdateUserService(
      mockUserRepository,
      mockUserToUserViewMapper,
    );

    mockUserRepository.findOne.mockReturnValue({
      userToBeUpdated,
    });
    mockUserRepository.findByEmail.mockReturnValue({
      ...userToBeUpdated,
      id: '2',
    });

    await updateUserService.execute(userToBeUpdated).catch(e => {
      expect(e).toBeInstanceOf(AppError);
      expect(e).toMatchObject({
        message: 'There is already a user registered with this e-mail address',
      });
    });
    expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.update).toHaveBeenCalledTimes(0);
  });
});
