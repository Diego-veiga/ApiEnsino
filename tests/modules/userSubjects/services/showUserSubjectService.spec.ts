import 'reflect-metadata';
import ShowUserSubjectsService from '@modules/userSubjects/services/ShowUserSubjectsService';
import { AppError } from '@shared/errors/AppError';
import { area } from '@modules/subjects/domain/enum/area';
import UserSubjects from '@modules/userSubjects/infra/typeorm/entities/userSubject';

const mockUserSubjectRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  getAllUserSubject: jest.fn(),
  getUserSubject: jest.fn(),
};

const mockUserSubjectToUserSubjectViewMapper = {
  mapperUserSubjectToUserSubjectView: jest.fn(),
};

describe('Show UserSubject Service', () => {
  it('should get the UserSubject ', async () => {
    const userSubject = {
      id: '123',
      userId: '456',
      subjectId: '789',
      grade: 14,
      active: true,
      user: {
        id: '147',
        name: 'teste',
        lastName: 'string',
        email: 'teste@teste.com',
        password: '123456',
        active: true,
        create_at: new Date(),
        update_at: new Date(),
      },
      subject: {
        id: '1',
        name: 'math',
        area: area.human,
        active: true,
        create_at: new Date(),
        update_at: new Date(),
      },
      create_at: new Date(),
      update_at: new Date(),
    } as UserSubjects;

    const userSubjectView = {
      id: '123',
      user: {
        id: '147',
        name: 'teste',
        lastName: 'string',
        email: 'teste@teste.com',
        active: true,
      },
      subject: {
        id: '1',
        name: 'math',
        area: area.human,
      },
      grade: 14,
      create: userSubject.create_at,
      update: userSubject.update_at,
    };

    const showUserSubjectsService = new ShowUserSubjectsService(
      mockUserSubjectRepository,
      mockUserSubjectToUserSubjectViewMapper,
    );

    mockUserSubjectRepository.getUserSubject.mockReturnValue(userSubject);
    mockUserSubjectToUserSubjectViewMapper.mapperUserSubjectToUserSubjectView.mockReturnValue(
      userSubjectView,
    );

    const result = await showUserSubjectsService.execute({
      subjectId: 'any id',
      userId: 'userId',
    });

    expect(result).toEqual(userSubjectView);
    expect(mockUserSubjectRepository.getUserSubject).toHaveBeenCalledTimes(1);
  });

  it('should get the UserSubject ', async () => {
    const showUserSubjectsService = new ShowUserSubjectsService(
      mockUserSubjectRepository,
      mockUserSubjectToUserSubjectViewMapper,
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
