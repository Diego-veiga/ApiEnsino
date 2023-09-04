import 'reflect-metadata';
import { AppError } from '@shared/errors/AppError';
import DeleteUserSubjectsService from '@modules/userSubjects/services/DeleteUserSubjectsService';

const mockUserSubjectRepository = {
  create: jest.fn(),
  getUserSubject: jest.fn(),
  getAll: jest.fn(),
  getById: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

describe('Delete UserSubject Service', () => {
  it('should delete the UserSubject ', async () => {
    const userDeleted = {
      name: 'abc',
      lastName: 'cde',
      email: 'fgh@ermail.com',
      password: '123',
    };

    const deleteUserSubjectsService = new DeleteUserSubjectsService(
      mockUserSubjectRepository,
    );
    mockUserSubjectRepository.getById.mockReturnValue(userDeleted);
    mockUserSubjectRepository.delete.mockReturnValue(true);

    await deleteUserSubjectsService.execute('1');

    expect(mockUserSubjectRepository.getById).toHaveBeenCalledTimes(1);
    expect(mockUserSubjectRepository.delete).toHaveBeenCalledTimes(1);
  });

  it('userSubject not found', async () => {
    const deleteUserSubjectsService = new DeleteUserSubjectsService(
      mockUserSubjectRepository,
    );
    mockUserSubjectRepository.getById.mockReturnValue(null);

    await deleteUserSubjectsService.execute('1').catch(e => {
      expect(e).toBeInstanceOf(AppError);
      expect(e).toMatchObject({
        message: 'enrollment not found',
      });
    });
    expect(mockUserSubjectRepository.delete).toHaveBeenCalledTimes(0);
  });
});
