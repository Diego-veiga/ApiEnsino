import 'reflect-metadata';
import ListUserSubjectsService from '@modules/userSubjects/services/ListUserSubjectsService';
import UserSubjects from '@modules/userSubjects/infra/typeorm/entities/userSubject';
import { area } from '@modules/subjects/domain/enum/area';

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

describe('List UserSubject Service', () => {
  it('should list the UserSubject ', async () => {
    const userSubjectList = [
      {
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
      },
      {
        id: '1234',
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
          area: area.exact,
          active: true,
          create_at: new Date(),
          update_at: new Date(),
        },
      },
    ] as UserSubjects[];

    const listUserSubjectsService = new ListUserSubjectsService(
      mockUserSubjectRepository,
      mockUserSubjectToUserSubjectViewMapper,
    );
    mockUserSubjectRepository.getAllUserSubject.mockReturnValue(
      userSubjectList,
    );

    await listUserSubjectsService.execute();

    expect(mockUserSubjectRepository.getAllUserSubject).toHaveBeenCalledTimes(
      1,
    );
    expect(
      mockUserSubjectToUserSubjectViewMapper.mapperUserSubjectToUserSubjectView,
    ).toHaveBeenCalledTimes(2);
  });

  it('should list the UserSubject empty ', async () => {
    const listUserSubjectsService = new ListUserSubjectsService(
      mockUserSubjectRepository,
      mockUserSubjectToUserSubjectViewMapper,
    );
    mockUserSubjectRepository.getAllUserSubject.mockReturnValue([]);

    await listUserSubjectsService.execute();

    expect(mockUserSubjectRepository.getAllUserSubject).toHaveBeenCalledTimes(
      1,
    );
    expect(
      mockUserSubjectToUserSubjectViewMapper.mapperUserSubjectToUserSubjectView,
    ).toHaveBeenCalledTimes(0);
  });
});
