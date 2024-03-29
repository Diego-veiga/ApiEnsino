import 'reflect-metadata';
import { AppError } from '@shared/errors/AppError';
import { area } from '@modules/subjects/domain/enum/area';
import DeleteSubjectService from '@modules/subjects/services/DeleteSubjectService';

const mockSubjectRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  findByName: jest.fn(),
};

describe('Delete Subject Service', () => {
  it('Must delete the subject', async () => {
    const subject = {
      id: '1',
      name: 'math',
      area: area.human,
      creationDate: new Date(),
      updateDate: new Date(),
    };
    const deleteSubjectService = new DeleteSubjectService(
      mockSubjectRepository,
    );
    mockSubjectRepository.findOne.mockReturnValue(subject);

    mockSubjectRepository.delete.mockReturnValue(true);

    await deleteSubjectService.execute('1');

    expect(mockSubjectRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockSubjectRepository.delete).toHaveBeenCalledTimes(1);
  });

  it('trying to delete a non-existent user', async () => {
    const deleteSubjectService = new DeleteSubjectService(
      mockSubjectRepository,
    );
    mockSubjectRepository.findOne.mockReturnValue(null);

    await deleteSubjectService.execute('1').catch(e => {
      expect(e).toBeInstanceOf(AppError);
      expect(e).toMatchObject({
        message: 'Subject does not exist',
      });
    });

    expect(mockSubjectRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockSubjectRepository.delete).toHaveBeenCalledTimes(0);
  });
});
