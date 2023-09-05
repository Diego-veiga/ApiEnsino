import 'reflect-metadata';
import ListUserSubjectsService from '@modules/userSubjects/services/ListUserSubjectsService';

const mockUserSubjectRepository = {
  create: jest.fn(),
  getUserSubject: jest.fn(),
  getAll: jest.fn(),
  getById: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

describe('List UserSubject Service', () => {
  it('should list the UserSubject ', async () => {
    const userSubjectList = [
      {
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
      },
      {
        id: 'f2635c2f-bf68-469b-87f6-5c3c94f1a8fa',
        user: {
          id: '53f8e8e3-7f47-41ac-a92b-dbae32a6cc9b',
          name: 'diego',
        },
        subject: {
          id: 'c1d4ce95-7425-4af6-a2f6-ff3a98024b08',
          name: 'Biologia',
          area: 'human',
        },
        create: '2023-08-15T12:53:36.783Z',
        update: '2023-08-21T14:27:37.868Z',
      },
    ];

    const listUserSubjectsService = new ListUserSubjectsService(
      mockUserSubjectRepository,
    );
    mockUserSubjectRepository.getAll.mockReturnValue(userSubjectList);

    const result = await listUserSubjectsService.execute();

    expect(result).toEqual(userSubjectList);
    expect(mockUserSubjectRepository.getAll).toHaveBeenCalledTimes(1);
  });
});
