import 'reflect-metadata';
import { AppError } from '@shared/errors/AppError';
import CreateSubjectService from '@modules/subjects/services/CreateSubject';
import { area } from '@modules/subjects/domain/enum/area';

const mockSubjectRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  findByName: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

describe('Create Subject Service', () => {
  it('Must register the subject', async () => {
    const subject = {
      id: '1',
      name: 'math',
      area: area.human,
      creationDate: new Date(),
      updateDate: new Date(),
    };
    const createSubjectService = new CreateSubjectService(
      mockSubjectRepository,
    );
    mockSubjectRepository.findByName.mockReturnValue(null);

    mockSubjectRepository.create.mockReturnValue(true);

    await createSubjectService.execute(subject);

    expect(mockSubjectRepository.findByName).toHaveBeenCalledTimes(1);
    expect(mockSubjectRepository.create).toHaveBeenCalledTimes(1);
    expect(mockSubjectRepository.create).toBeCalledWith({
      name: 'math',
      area: area.human,
    });
  });
  it('must not register subjects with the same name', async () => {
    const subject = {
      id: '1',
      name: 'math',
      area: area.human,
      creationDate: new Date(),
      updateDate: new Date(),
    };
    const createSubjectService = new CreateSubjectService(
      mockSubjectRepository,
    );
    mockSubjectRepository.findByName.mockReturnValue(subject);
    mockSubjectRepository.create.mockReturnValue(true);

    await createSubjectService.execute(subject).catch(e => {
      expect(e).toBeInstanceOf(AppError);
      expect(e).toMatchObject({
        message: 'There is already a subject registered with this name',
      });
    });

    expect(mockSubjectRepository.findByName).toHaveBeenCalledTimes(1);
    expect(mockSubjectRepository.create).toHaveBeenCalledTimes(0);
  });
});
