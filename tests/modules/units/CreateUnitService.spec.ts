import 'reflect-metadata';
import CreateUnitService from '@modules/unit/services/CreateUnitservies';

const mockUnitRepository = {
  save: jest.fn(),
  update: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
  delete: jest.fn(),
};

describe('CreateUnitService', () => {
  it('should create unit', async () => {
    const createUnitService = new CreateUnitService(mockUnitRepository);
    mockUnitRepository.save.mockImplementation();

    await createUnitService.execute({
      title: 'any title',
      explanation: 'any explanation',
    });

    expect(mockUnitRepository.save).toHaveBeenCalledTimes(1);
  });
});
