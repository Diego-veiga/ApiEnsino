import 'reflect-metadata';
import { AppError } from '@shared/errors/AppError';
import DeleteUserService from '@modules/users/services/DeleteUserService';

const mockUserRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  findByName: jest.fn(),
  findByEmail: jest.fn(),
};

describe('Delete User Service', () => {
  it('should delete the user ', async () => {
    const userDeleted = {
      name: 'abc',
      lastName: 'cde',
      email: 'fgh@ermail.com',
      password: '123',
    };
    const deleteUserService = new DeleteUserService(mockUserRepository);
    mockUserRepository.findOne.mockReturnValue(userDeleted);
    mockUserRepository.delete.mockReturnValue(true);

    await deleteUserService.execute('1');

    expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.delete).toHaveBeenCalledTimes(1);
  });

  it('user not found', async () => {
    const deleteUserService = new DeleteUserService(mockUserRepository);
    mockUserRepository.findOne.mockReturnValue(null);

    await deleteUserService.execute('1').catch(e => {
      expect(e).toBeInstanceOf(AppError);
      expect(e).toMatchObject({
        message: 'User does not exist',
      });
    });
    expect(mockUserRepository.delete).toHaveBeenCalledTimes(0);
  });
});
