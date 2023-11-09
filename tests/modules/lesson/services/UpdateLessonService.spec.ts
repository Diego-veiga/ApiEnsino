import 'reflect-metadata';
import LessonView from '@modules/lesson/domain/View/LessonView';
import { AppError } from '@shared/errors/AppError';
import UpdateLessonService from '@modules/lesson/services/UpdateLessonService';
import IUpdateLessonRequest from '@modules/lesson/domain/Request/IUpdateLessonRequest';

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

describe('Update Lesson Service', () => {
  it('must return the list lesson', async () => {
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

    const unit = {
      id: 'any id',
      title: 'any title',
      explanation: 'any explanation',
      createAt: 'any create',
      updateAt: 'any update',
    };

    const updateLessonRequest = {
      id: 'any id',
      description: 'any description',
      unitId: 'any unitId',
    } as IUpdateLessonRequest;

    const updateLessonService = new UpdateLessonService(
      mockLessonRepository,
      mockUnitRepository,
      mockLessonToLessonViewMapper,
    );

    mockLessonToLessonViewMapper.mapperLessonToLessonView.mockReturnValue(
      lesson,
    );
    mockLessonRepository.findOne.mockReturnValue(lesson);
    mockUnitRepository.findOne.mockReturnValue(unit);

    await updateLessonService.execute(updateLessonRequest);

    expect(mockLessonRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockUnitRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockLessonRepository.update).toHaveBeenCalledTimes(1);
    expect(
      mockLessonToLessonViewMapper.mapperLessonToLessonView,
    ).toHaveBeenCalledTimes(1);
  });

  it('try update lesson with unit not exist', async () => {
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

    const updateLessonRequest = {
      id: 'any id',
      description: 'any description',
      unitId: 'any unitId',
    } as IUpdateLessonRequest;

    const updateLessonService = new UpdateLessonService(
      mockLessonRepository,
      mockUnitRepository,
      mockLessonToLessonViewMapper,
    );

    mockLessonRepository.findOne.mockReturnValue(lesson);
    mockUnitRepository.findOne.mockReturnValue(undefined);
    mockLessonToLessonViewMapper.mapperLessonToLessonView.mockReturnValue(null);

    await updateLessonService.execute(updateLessonRequest).catch(e => {
      expect(e).toBeInstanceOf(AppError);
      expect(e).toMatchObject({
        message: 'unit not found',
      });
    });
    expect(mockLessonRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockUnitRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockLessonRepository.update).toHaveBeenCalledTimes(0);
    expect(
      mockLessonToLessonViewMapper.mapperLessonToLessonView,
    ).toHaveBeenCalledTimes(0);
  });

  it('try update lesson not exist', async () => {
    const updateLessonRequest = {
      id: 'any id',
      description: 'any description',
      unitId: 'any unitId',
    } as IUpdateLessonRequest;

    const updateLessonService = new UpdateLessonService(
      mockLessonRepository,
      mockUnitRepository,
      mockLessonToLessonViewMapper,
    );

    mockLessonRepository.findOne.mockReturnValue(undefined);
    mockUnitRepository.findOne.mockReturnValue(undefined);
    mockLessonToLessonViewMapper.mapperLessonToLessonView.mockReturnValue(null);

    await updateLessonService.execute(updateLessonRequest).catch(e => {
      expect(e).toBeInstanceOf(AppError);
      expect(e).toMatchObject({
        message: 'lesson not found',
      });
    });
    expect(mockLessonRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockUnitRepository.findOne).toHaveBeenCalledTimes(0);
    expect(mockLessonRepository.update).toHaveBeenCalledTimes(0);
    expect(
      mockLessonToLessonViewMapper.mapperLessonToLessonView,
    ).toHaveBeenCalledTimes(0);
  });
});
