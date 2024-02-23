import 'reflect-metadata';
import ShowUnitService from '@modules/Unit/services/ShowUnitservies';

const mockUnitRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  findByName: jest.fn(),
};

describe('ShowUnitService', () => {
  it('should get unit with id', async () => {
    const showUnitService = new ShowUnitService(mockUnitRepository);
    mockUnitRepository.findOne.mockReturnValue({
      id: 'any id',
      title: 'any title',
      explanation: 'any explanation',
      createAt: 'any create',
      updateAt: 'any update',
    });

    await showUnitService.execute('any id');

    expect(mockUnitRepository.findOne).toHaveBeenCalledTimes(1);
  });
});
