import 'reflect-metadata';
import { AppError } from '@shared/errors/AppError';
import CreateLessonService from '@modules/lesson/services/CreateLessonService';

const mockLessonRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

const mockUnitRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

const mockLessonToLessonViewMapper = {
  mapperLessonToLessonView: jest.fn(),
};

describe('Create Lesson Service', () => {
  it('Must register the Lesson', async () => {
    const unit = {
      id: 'any id ',
      title: 'string',
      explanation: 'string',
      active: true,
      creationDate: new Date(),
      updateDate: new Date(),
    };
    const lesson = {
      description: 'any description',
      unitId: 'any unitId',
    };

    const lessonView = {
      id: 'any id ',
      numberQuestions: 10,
      progress: 10,
      description: 'Any description',
      active: true,
      unitId: 'any unitId',
      create_at: new Date(),
      update_at: new Date(),
    };
    const createLessonService = new CreateLessonService(
      mockLessonRepository,
      mockUnitRepository,
      mockLessonToLessonViewMapper,
    );
    mockUnitRepository.findOne.mockReturnValue(unit);

    mockLessonRepository.create.mockReturnValue(true);
    mockLessonToLessonViewMapper.mapperLessonToLessonView.mockReturnValue(
      lessonView,
    );

    await createLessonService.execute(lesson);

    expect(mockUnitRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockLessonRepository.create).toHaveBeenCalledTimes(1);
  });

  it('must not register lesson where unit not exist', async () => {
    const lesson = {
      description: 'any description',
      unitId: 'any unitId',
    };
    const createLessonService = new CreateLessonService(
      mockLessonRepository,
      mockUnitRepository,
      mockLessonToLessonViewMapper,
    );
    mockUnitRepository.findOne.mockReturnValue(null);
    mockLessonRepository.create.mockReturnValue(true);

    await createLessonService.execute(lesson).catch(e => {
      expect(e).toBeInstanceOf(AppError);
      expect(e).toMatchObject({
        message: 'Unit does not exist',
      });
    });

    expect(mockUnitRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockLessonRepository.create).toHaveBeenCalledTimes(0);
    expect(
      mockLessonToLessonViewMapper.mapperLessonToLessonView,
    ).toHaveBeenCalledTimes(0);
  });
});
