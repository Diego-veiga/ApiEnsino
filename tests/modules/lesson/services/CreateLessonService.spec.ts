import 'reflect-metadata';
import { AppError } from '@shared/errors/AppError';
import CreateLessonService from '@modules/lesson/services/CreateLessonService';

const mockLessonRepository = {
  create: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

const mockUnitRepository = {
  save: jest.fn(),
  update: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
  delete: jest.fn(),
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
    const createLessonService = new CreateLessonService(
      mockLessonRepository,
      mockUnitRepository,
    );
    mockUnitRepository.getById.mockReturnValue(unit);

    mockLessonRepository.create.mockReturnValue(true);

    await createLessonService.execute(lesson);

    expect(mockUnitRepository.getById).toHaveBeenCalledTimes(1);
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
    );
    mockUnitRepository.getById.mockReturnValue(null);
    mockLessonRepository.create.mockReturnValue(true);

    await createLessonService.execute(lesson).catch(e => {
      expect(e).toBeInstanceOf(AppError);
      expect(e).toMatchObject({
        message: 'Unit does not exist',
      });
    });

    expect(mockUnitRepository.getById).toHaveBeenCalledTimes(1);
    expect(mockLessonRepository.create).toHaveBeenCalledTimes(0);
  });
});
