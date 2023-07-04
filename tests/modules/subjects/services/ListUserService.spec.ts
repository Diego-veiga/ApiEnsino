import 'reflect-metadata';
import ListSubjectService from '@modules/subjects/services/ListSubjectService';

const mockSubjectRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  findByName: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

describe('List Subject Service', () => {
  it('should return empty list ', async () => {
    const listSubjectService = new ListSubjectService(mockSubjectRepository);
    mockSubjectRepository.findAll.mockReturnValue([]);

    const result = await listSubjectService.execute();

    expect(mockSubjectRepository.findAll).toHaveBeenCalledTimes(1);
    expect(result.length).toEqual(0);
  });

  it('Returns a list of subject ', async () => {
    const subject = [
      {
        id: '48060c27-352c-41a0-afd6-111578219f6c',
        name: 'Portugues',
        area: 'human',
        creationDate: '2023-05-10T14:36:05.197Z',
        updateDate: '2023-05-11T13:41:18.426Z',
      },
      {
        id: 'a00ffaf7-c2f0-4483-bd9e-a1da4221a4b9',
        name: 'matematica',
        area: 'exact',
        creationDate: '2023-05-11T13:42:25.781Z',
        updateDate: '2023-05-11T13:42:25.781Z',
      },
    ];
    const listSubjectService = new ListSubjectService(mockSubjectRepository);
    const results = await listSubjectService.execute();

    mockSubjectRepository.findAll.mockReturnValue(subject);

    expect(mockSubjectRepository.findAll).toHaveBeenCalledTimes(1);
    expect(results).not.toBeNull();
  });
});
