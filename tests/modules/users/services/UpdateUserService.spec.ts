import 'reflect-metadata';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import IUser from '@modules/users/domain/IUser';
import { AppError } from '@shared/errors/AppError';

const mockUserRepository = {
  create: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  findByEmail: jest.fn(),
  update: jest.fn(),
};

describe('Update User Service', () => {
  beforeAll(() => {
    mockUserRepository.findAll.mockReset();
    mockUserRepository.findById.mockReset();
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
    } as IUser;

    const updateUserService = new UpdateUserService(mockUserRepository);
    mockUserRepository.findById.mockReturnValue(userToBeUpdated);
    mockUserRepository.findByEmail.mockReturnValue(userToBeUpdated);
    mockUserRepository.update.mockReturnValue(userToBeUpdated);

    await updateUserService.execute(userToBeUpdated);

    expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.update).toHaveBeenCalledTimes(1);
  });

  it('must not update non-existent user', async () => {
    const userToBeUpdated = {
      id: '1',
      name: 'abcd',
      lastName: 'cder',
      email: 'fghi@ermail.com',
      password: '123',
    } as IUser;
    const updateUserService = new UpdateUserService(mockUserRepository);
    mockUserRepository.findById.mockReturnValue(undefined);

    await updateUserService.execute(userToBeUpdated).catch(e => {
      expect(e).toBeInstanceOf(AppError);
      expect(e).toMatchObject({
        message: 'User does not exist',
      });
    });
    expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
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
    } as IUser;
    const updateUserService = new UpdateUserService(mockUserRepository);
    mockUserRepository.findById.mockReturnValue({
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
    expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.update).toHaveBeenCalledTimes(0);
  });
});
