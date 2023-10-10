import 'reflect-metadata';
import DeleteLessonService from '@modules/lesson/services/DeleteLessonService';
import { AppError } from '@shared/errors/AppError';

const mockLessonRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

describe('DeleteLessonService', () => {
  it('should delete lesson', async () => {
    const deleteLessonService = new DeleteLessonService(mockLessonRepository);
    mockLessonRepository.findOne.mockReturnValue({
      id: 'any id',
      title: 'any title',
      explanation: 'any explanation',
      createAt: 'any create',
      updateAt: 'any update',
    });

    await deleteLessonService.execute('any id');

    expect(mockLessonRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockLessonRepository.delete).toHaveBeenCalledTimes(1);
  });

  it('delete Lesson not existing ', async () => {
    const deleteLessonService = new DeleteLessonService(mockLessonRepository);
    mockLessonRepository.findOne.mockReturnValue(null);

    await deleteLessonService.execute('any id').catch(e => {
      expect(e).toBeInstanceOf(AppError);
      expect(e).toMatchObject({
        message: 'Lesson does not exist',
      });
    });

    expect(mockLessonRepository.findOne).toBeCalledTimes(1);
    expect(mockLessonRepository.update).toBeCalledTimes(0);
  });
});
