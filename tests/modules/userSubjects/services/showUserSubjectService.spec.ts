import 'reflect-metadata';
import ShowUserSubjectsService from '@modules/userSubjects/services/ShowUserSubjectsService';
import { AppError } from '@shared/errors/AppError';

const mockUserSubjectRepository = {
  create: jest.fn(),
  getUserSubject: jest.fn(),
  getAll: jest.fn(),
  getById: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

describe('Show UserSubject Service', () => {
  it('should get the UserSubject ', async () => {
    const userSubject = {
      id: '71465606-9710-4c5c-b5dc-32d8f6cfba26',
      user: {
        id: '53f8e8e3-7f47-41ac-a92b-dbae32a6cc9b',
        name: 'diego',
      },
      subject: {
        id: '9b9b0529-c9fb-4298-809d-daa692923b87',
        name: 'matamatica',
        area: 'exact',
      },
      create: '2023-08-07T23:08:10.644Z',
      update: '2023-08-17T13:23:57.757Z',
    };

    const showUserSubjectsService = new ShowUserSubjectsService(
      mockUserSubjectRepository,
    );
    mockUserSubjectRepository.getUserSubject.mockReturnValue(userSubject);

    const result = await showUserSubjectsService.execute({
      subjectId: 'any id',
      userId: 'userId',
    });

    expect(result).toEqual(userSubject);
    expect(mockUserSubjectRepository.getUserSubject).toHaveBeenCalledTimes(1);
  });

  it('should get the UserSubject ', async () => {
    const showUserSubjectsService = new ShowUserSubjectsService(
      mockUserSubjectRepository,
    );
    mockUserSubjectRepository.getUserSubject.mockReturnValue(null);

    await showUserSubjectsService
      .execute({
        subjectId: 'any id',
        userId: 'userId',
      })
      .catch(e => {
        expect(e).toBeInstanceOf(AppError);
        expect(e).toMatchObject({
          message: 'user not registered for this subject',
        });
      });

    expect(mockUserSubjectRepository.getUserSubject).toHaveBeenCalledTimes(1);
  });
});