import 'reflect-metadata';
import ShowSubjectService from '@modules/subjects/services/ShowSubjectService';

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

describe('Show Subject Service', () => {
  it('must return the subject', async () => {
    const subject = {
      id: '48060c27-352c-41a0-afd6-111578219f6c',
      name: 'Portugues',
      area: 'human',
      creationDate: '2023-05-10T14:36:05.197Z',
      updateDate: '2023-05-11T13:41:18.426Z',
    };

    const showSubjectService = new ShowSubjectService(
      mockSubjectRepository,
      mockSubjectToSubjectViewMapper,
    );

    mockSubjectRepository.findOne.mockReturnValue(subject);
    mockSubjectToSubjectViewMapper.mapperSubjectToSubjectView.mockReturnValue(
      subject,
    );

    const result = await showSubjectService.execute('1');

    expect(mockSubjectRepository.findOne).toHaveBeenCalledTimes(1);
    expect(
      mockSubjectToSubjectViewMapper.mapperSubjectToSubjectView,
    ).toHaveBeenCalledTimes(1);
    expect(result).toEqual(subject);
  });

  it('should return empty subject', async () => {
    const showSubjectService = new ShowSubjectService(
      mockSubjectRepository,
      mockSubjectToSubjectViewMapper,
    );

    mockSubjectRepository.findOne.mockReturnValue(undefined);
    mockSubjectToSubjectViewMapper.mapperSubjectToSubjectView.mockReturnValue(
      null,
    );
    const results = await showSubjectService.execute('2');

    expect(mockSubjectRepository.findOne).toHaveBeenCalledTimes(1);
    expect(
      mockSubjectToSubjectViewMapper.mapperSubjectToSubjectView,
    ).toHaveBeenCalledTimes(0);
    expect(results).toBe(null);
  });
});
