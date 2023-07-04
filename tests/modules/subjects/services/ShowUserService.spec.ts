import 'reflect-metadata';
import ShowSubjectService from '@modules/subjects/services/ShowSubjectService';

const mockSubjectRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  findByName: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

describe('Show Subject Service', () => {
  beforeAll(() => {
    mockSubjectRepository.findAll.mockReset();
    mockSubjectRepository.findById.mockReset();
    mockSubjectRepository.create.mockReset();
    mockSubjectRepository.update.mockReset();
    mockSubjectRepository.delete.mockReset();
  });
  it('must return the subject', async () => {
    const subject = {
      id: '48060c27-352c-41a0-afd6-111578219f6c',
      name: 'Portugues',
      area: 'human',
      creationDate: '2023-05-10T14:36:05.197Z',
      updateDate: '2023-05-11T13:41:18.426Z',
    };
    const showSubjectService = new ShowSubjectService(mockSubjectRepository);
    mockSubjectRepository.findById.mockReturnValue(subject);

    const result = await showSubjectService.execute('1');

    expect(mockSubjectRepository.findById).toHaveBeenCalledTimes(1);
    expect(result).toEqual(subject);
  });

  it('should return empty subject', async () => {
    const showSubjectService = new ShowSubjectService(mockSubjectRepository);
    mockSubjectRepository.findById.mockReturnValue(undefined);
    const results = await showSubjectService.execute('2');

    expect(mockSubjectRepository.findById).toHaveBeenCalledTimes(1);
    expect(results).toBe(undefined);
  });
});
