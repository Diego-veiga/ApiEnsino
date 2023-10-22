import 'reflect-metadata';
import { AppError } from '@shared/errors/AppError';
import UpdateSubjectService from '@modules/subjects/services/UpdateSubjectService';
import IUpdateSubject from '@modules/subjects/domain/Request/IUpdateSubject';

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

describe('Update Subject Service', () => {
  beforeAll(() => {
    mockSubjectRepository.findAll.mockReset();
    mockSubjectRepository.findOne.mockReset();
    mockSubjectRepository.create.mockReset();
    mockSubjectRepository.update.mockReset();
    mockSubjectRepository.delete.mockReset();
  });
  it('must update subject successfully', async () => {
    const subjectToBeUpdated = {
      id: 'a00ffaf7-c2f0-4483-bd9e-a1da4221a4b9',
      name: 'matematica',
      area: 'exact',
    } as IUpdateSubject;

    const updateSubjectService = new UpdateSubjectService(
      mockSubjectRepository,
      mockSubjectToSubjectViewMapper,
    );

    mockSubjectRepository.findOne.mockReturnValue(subjectToBeUpdated);
    mockSubjectRepository.findByName.mockReturnValue(subjectToBeUpdated);
    mockSubjectRepository.update.mockReturnValue(subjectToBeUpdated);

    await updateSubjectService.execute(subjectToBeUpdated);

    expect(mockSubjectRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockSubjectRepository.findByName).toHaveBeenCalledTimes(1);
    expect(mockSubjectRepository.update).toHaveBeenCalledTimes(1);
  });

  it('must not update non-existent subject', async () => {
    const subjectToBeUpdated = {
      id: 'a00ffaf7-c2f0-4483-bd9e-a1da4221a4b9',
      name: 'matematica',
      area: 'exact',
    } as IUpdateSubject;

    const updateSubjectService = new UpdateSubjectService(
      mockSubjectRepository,
      mockSubjectToSubjectViewMapper,
    );

    mockSubjectRepository.findOne.mockReturnValue(undefined);

    await updateSubjectService.execute(subjectToBeUpdated).catch(e => {
      expect(e).toBeInstanceOf(AppError);
      expect(e).toMatchObject({
        message: 'Subject does not exist',
      });
    });
    expect(mockSubjectRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockSubjectRepository.findByName).toHaveBeenCalledTimes(0);
    expect(mockSubjectRepository.update).toHaveBeenCalledTimes(0);
  });

  it('should not update subject with different id', async () => {
    const subjectToBeUpdated = {
      id: 'a00ffaf7-c2f0-4483-bd9e-a1da4221a4b9',
      name: 'matematica',
      area: 'exact',
    } as IUpdateSubject;

    const updateSubjectService = new UpdateSubjectService(
      mockSubjectRepository,
      mockSubjectToSubjectViewMapper,
    );

    mockSubjectRepository.findOne.mockReturnValue({
      subjectToBeUpdated,
    });
    mockSubjectRepository.findByName.mockReturnValue({
      ...subjectToBeUpdated,
      id: '2',
    });

    await updateSubjectService.execute(subjectToBeUpdated).catch(e => {
      expect(e).toBeInstanceOf(AppError);
      expect(e).toMatchObject({
        message: 'There is already a subject registered with this name',
      });
    });
    expect(mockSubjectRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockSubjectRepository.findByName).toHaveBeenCalledTimes(1);
    expect(mockSubjectRepository.update).toHaveBeenCalledTimes(0);
  });
});
