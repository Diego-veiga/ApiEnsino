import 'reflect-metadata';
import LessonView from '@modules/lesson/domain/View/LessonView';
import ListLessonService from '@modules/lesson/services/ListLessonService';

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

describe('List Lesson Service', () => {
  it('must return the list lesson', async () => {
    const lessons = [
      {
        id: 'any id',
        description: 'any description',
        unitId: 'any unitId',
        numberQuestions: 0,
        progress: 0,
        active: true,
        create_at: new Date(),
        update_at: new Date(),
      },
      {
        id: 'any id',
        description: 'any description',
        unitId: 'any unitId',
        numberQuestions: 0,
        progress: 0,
        active: true,
        create_at: new Date(),
        update_at: new Date(),
      },
    ] as LessonView[];

    const listLessonService = new ListLessonService(
      mockLessonRepository,
      mockLessonToLessonViewMapper,
    );
    mockLessonRepository.findAll.mockReturnValue(lessons);
    mockLessonToLessonViewMapper.mapperLessonToLessonView.mockReturnValue(
      lessons[0],
    );

    const result = await listLessonService.execute();

    expect(mockLessonRepository.findAll).toHaveBeenCalledTimes(1);
    expect(
      mockLessonToLessonViewMapper.mapperLessonToLessonView,
    ).toHaveBeenCalledTimes(2);
    expect(result).toEqual(lessons);
  });

  it('should return empty lesson', async () => {
    mockLessonRepository.findAll.mockReturnValue(undefined);

    const listLessonService = new ListLessonService(
      mockLessonRepository,
      mockLessonToLessonViewMapper,
    );
    mockLessonRepository.findAll.mockReturnValue([]);

    const result = await listLessonService.execute();

    expect(mockLessonRepository.findAll).toHaveBeenCalledTimes(1);
    expect(
      mockLessonToLessonViewMapper.mapperLessonToLessonView,
    ).toHaveBeenCalledTimes(0);
    expect(result).toEqual([]);
  });
});
