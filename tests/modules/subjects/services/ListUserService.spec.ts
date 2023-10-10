import 'reflect-metadata';
import ListSubjectService from '@modules/subjects/services/ListSubjectService';

const mockSubjectRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  findByName: jest.fn(),
};

const mockSubjectToSubjectViewMapper = {
  mapperSubjectToSubjectView: jest.fn(),
};

describe('List Subject Service', () => {
  it('should return empty list ', async () => {
    const listSubjectService = new ListSubjectService(
      mockSubjectRepository,
      mockSubjectToSubjectViewMapper,
    );
    mockSubjectRepository.findAll.mockReturnValue([]);
    mockSubjectToSubjectViewMapper.mapperSubjectToSubjectView.mockReturnValue(
      null,
    );

    const result = await listSubjectService.execute();

    expect(mockSubjectRepository.findAll).toHaveBeenCalledTimes(1);
    expect(
      mockSubjectToSubjectViewMapper.mapperSubjectToSubjectView,
    ).toHaveBeenCalledTimes(0);
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

    const listSubjectService = new ListSubjectService(
      mockSubjectRepository,
      mockSubjectToSubjectViewMapper,
    );

    mockSubjectRepository.findAll.mockReturnValue(subject);
    mockSubjectToSubjectViewMapper.mapperSubjectToSubjectView.mockReturnValue(
      subject[0],
    );

    const results = await listSubjectService.execute();

    expect(mockSubjectRepository.findAll).toHaveBeenCalledTimes(1);
    expect(
      mockSubjectToSubjectViewMapper.mapperSubjectToSubjectView,
    ).toHaveBeenCalledTimes(2);
    expect(results).not.toBeNull();
  });
});
