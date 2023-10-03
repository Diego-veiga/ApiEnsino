import 'reflect-metadata';
import ShowLessonService from '@modules/lesson/services/ShowLessonService';
import LessonView from '@modules/lesson/domain/View/LessonView';
import { AppError } from '@shared/errors/AppError';

const mockLessonRepository = {
  create: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

describe('Show Lesson Service', () => {
  beforeAll(() => {
    mockLessonRepository.getAll.mockReset();
    mockLessonRepository.getById.mockReset();
    mockLessonRepository.create.mockReset();
    mockLessonRepository.update.mockReset();
    mockLessonRepository.delete.mockReset();
  });
  it('must return the lesson', async () => {
    const lesson = {
      id: 'any id',
      description: 'any description',
      unitId: 'any unitId',
      numberQuestions: 0,
      progress: 0,
      active: true,
      create_at: new Date(),
      update_at: new Date(),
    } as LessonView;

    const showLessonService = new ShowLessonService(mockLessonRepository);
    mockLessonRepository.getById.mockReturnValue(lesson);

    const result = await showLessonService.execute('1');

    expect(mockLessonRepository.getById).toHaveBeenCalledTimes(1);
    expect(result).toEqual(lesson);
  });

  it('should return empty lesson', async () => {
    const showLessonService = new ShowLessonService(mockLessonRepository);
    mockLessonRepository.getById.mockReturnValue(undefined);

    await showLessonService.execute('2').catch(e => {
      expect(e).toBeInstanceOf(AppError);
      expect(e).toMatchObject({
        message: 'lesson not found',
      });
    });
    expect(mockLessonRepository.getById).toHaveBeenCalledTimes(1);
  });
});
