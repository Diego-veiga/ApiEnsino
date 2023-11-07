import 'reflect-metadata';
import { area } from '@modules/subjects/domain/enum/area';
import SubjectView from '@modules/subjects/domain/View/SubjectView';

import CreateUserSubjects from '@modules/userSubjects/services/CreateUserSubjectsService';
import { AppError } from '@shared/errors/AppError';
import UserView from '@modules/users/domain/View/UserView';

const mockUserSubjectRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  getAllUserSubject: jest.fn(),
  getUserSubject: jest.fn(),
};

const mockUserRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  findByName: jest.fn(),
  findByEmail: jest.fn(),
};

const mockSubjectRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  findByName: jest.fn(),
};

const mockUserSubjectToUserSubjectViewMapper = {
  mapperUserSubjectToUserSubjectView: jest.fn(),
};

describe('CreateUserSubjectsService', () => {
  it('Should create userSubjects', async () => {
    const userMockModel = {
      id: 'any id',
      email: 'any email',
      lastName: 'any lastName',
      name: 'any name',
      password: '123',
      active: true,
      creationDate: new Date(),
      updateDate: new Date(),
    } as UserView;

    const subjectMockModel = {
      id: 'any id',
      name: 'any name',
      area: area.exact,
      creationDate: new Date(),
      updateDate: new Date(),
    } as SubjectView;

    mockUserRepository.findOne.mockReturnValue(userMockModel);
    mockSubjectRepository.findOne.mockReturnValue(subjectMockModel);
    mockUserSubjectRepository.getUserSubject.mockReturnValue(null);

    const createUserSubjectsService = new CreateUserSubjects(
      mockUserSubjectRepository,
      mockSubjectRepository,
      mockUserRepository,
      mockUserSubjectToUserSubjectViewMapper,
    );

    await createUserSubjectsService.execute({
      subjectId: '123',
      userId: '123',
    });

    expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockSubjectRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockSubjectRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockUserSubjectRepository.getUserSubject).toHaveBeenCalledTimes(1);
    expect(mockUserSubjectRepository.create).toHaveBeenCalledTimes(1);
  });

  it('try to create userSubject with non-existent user', async () => {
    const subjectMockModel = {
      id: 'any id',
      name: 'any name',
      area: area.exact,
      creationDate: new Date(),
      updateDate: new Date(),
    } as SubjectView;

    mockUserRepository.findOne.mockReturnValue(null);
    mockSubjectRepository.findOne.mockReturnValue(subjectMockModel);
    mockUserSubjectRepository.getUserSubject.mockReturnValue(null);

    const createUserSubjectsService = new CreateUserSubjects(
      mockUserSubjectRepository,
      mockSubjectRepository,
      mockUserRepository,
      mockUserSubjectToUserSubjectViewMapper,
    );

    await createUserSubjectsService
      .execute({
        subjectId: '123',
        userId: '123',
      })
      .catch(e => {
        expect(e).toBeInstanceOf(AppError);
        expect(e).toMatchObject({
          message: 'User not found',
        });
      });

    expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockSubjectRepository.findOne).toHaveBeenCalledTimes(0);
    expect(mockSubjectRepository.findOne).toHaveBeenCalledTimes(0);
    expect(mockUserSubjectRepository.getUserSubject).toHaveBeenCalledTimes(0);
    expect(mockUserSubjectRepository.create).toHaveBeenCalledTimes(0);
  });

  it('try to create userSubject with non-existent subject', async () => {
    const userMockModel = {
      id: 'any id',
      email: 'any email',
      lastName: 'any lastName',
      name: 'any name',
      password: '123',
      active: true,
      creationDate: new Date(),
      updateDate: new Date(),
    } as UserView;

    mockUserRepository.findOne.mockReturnValue(userMockModel);
    mockSubjectRepository.findOne.mockReturnValue(null);
    mockUserSubjectRepository.getUserSubject.mockReturnValue(null);

    const createUserSubjectsService = new CreateUserSubjects(
      mockUserSubjectRepository,
      mockSubjectRepository,
      mockUserRepository,
      mockUserSubjectToUserSubjectViewMapper,
    );

    await createUserSubjectsService
      .execute({
        subjectId: '123',
        userId: '123',
      })
      .catch(e => {
        expect(e).toBeInstanceOf(AppError);
        expect(e).toMatchObject({
          message: 'Subject not found',
        });
      });

    expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockSubjectRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockUserSubjectRepository.getUserSubject).toHaveBeenCalledTimes(0);
    expect(mockUserSubjectRepository.create).toHaveBeenCalledTimes(0);
  });

  it('try to create userSubject with existing userSubject', async () => {
    const userMockModel = {
      id: 'any id',
      email: 'any email',
      lastName: 'any lastName',
      name: 'any name',
      password: '123',
      active: true,
      creationDate: new Date(),
      updateDate: new Date(),
    } as UserView;

    const subjectMockModel = {
      id: 'any id',
      name: 'any name',
      area: area.exact,
      creationDate: new Date(),
      updateDate: new Date(),
    } as SubjectView;
    const userSubjectMockModel = {
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

    mockUserRepository.findOne.mockReturnValue(userMockModel);
    mockSubjectRepository.findOne.mockReturnValue(subjectMockModel);
    mockUserSubjectRepository.getUserSubject.mockReturnValue(
      userSubjectMockModel,
    );

    const createUserSubjectsService = new CreateUserSubjects(
      mockUserSubjectRepository,
      mockSubjectRepository,
      mockUserRepository,
      mockUserSubjectToUserSubjectViewMapper,
    );

    await createUserSubjectsService
      .execute({
        subjectId: '123',
        userId: '123',
      })
      .catch(e => {
        expect(e).toBeInstanceOf(AppError);
        expect(e).toMatchObject({
          message: 'Student already registered in this subject',
        });
      });

    expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockSubjectRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockUserSubjectRepository.getUserSubject).toHaveBeenCalledTimes(1);
    expect(mockUserSubjectRepository.create).toHaveBeenCalledTimes(0);
  });
});
