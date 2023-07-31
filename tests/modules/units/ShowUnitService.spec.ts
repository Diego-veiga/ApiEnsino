import 'reflect-metadata';
import ShowUnitService from '@modules/unit/services/ShowUnitservies';

const mockUnitRepository = {
  save: jest.fn(),
  update: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
  delete: jest.fn(),
};

describe('ShowUnitService', () => {
  it('should get unit with id', async () => {
    const showUnitService = new ShowUnitService(mockUnitRepository);
    mockUnitRepository.getById.mockReturnValue({
      id: 'any id',
      title: 'any title',
      explanation: 'any explanation',
      createAt: 'any create',
      updateAt: 'any update',
    });

    await showUnitService.execute('any id');

    expect(mockUnitRepository.getById).toHaveBeenCalledTimes(1);
  });
});
