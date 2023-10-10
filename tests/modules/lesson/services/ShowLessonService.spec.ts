import 'reflect-metadata';
import ShowLessonService from '@modules/lesson/services/ShowLessonService';
import LessonView from '@modules/lesson/domain/View/LessonView';
import { AppError } from '@shared/errors/AppError';

const mockLessonRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

const mockLessonToLessonViewMapper = {
  mapperLessonToLessonView: jest.fn(),
};

describe('Show Lesson Service', () => {
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

    const showLessonService = new ShowLessonService(
      mockLessonRepository,
      mockLessonToLessonViewMapper,
    );
    mockLessonRepository.findOne.mockReturnValue(lesson);
    mockLessonToLessonViewMapper.mapperLessonToLessonView.mockReturnValue(
      lesson,
    );

    const result = await showLessonService.execute('1');

    expect(mockLessonRepository.findOne).toHaveBeenCalledTimes(1);
    expect(
      mockLessonToLessonViewMapper.mapperLessonToLessonView,
    ).toHaveBeenCalledTimes(1);
    expect(result).toEqual(lesson);
  });

  it('should return empty lesson', async () => {
    const showLessonService = new ShowLessonService(
      mockLessonRepository,
      mockLessonToLessonViewMapper,
    );
    mockLessonRepository.findOne.mockReturnValue(undefined);

    await showLessonService.execute('2').catch(e => {
      expect(e).toBeInstanceOf(AppError);
      expect(e).toMatchObject({
        message: 'lesson not found',
      });
    });
    expect(mockLessonRepository.findOne).toHaveBeenCalledTimes(1);
    expect(
      mockLessonToLessonViewMapper.mapperLessonToLessonView,
    ).toHaveBeenCalledTimes(0);
  });
});
