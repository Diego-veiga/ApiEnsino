import 'reflect-metadata';
import ListUnitService from '@modules/unit/services/ListUnitservies';

const mockUnitRepository = {
  save: jest.fn(),
  update: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
  delete: jest.fn(),
};

describe('ListUnitService', () => {
  it('list all unit ', async () => {
    const listUnitService = new ListUnitService(mockUnitRepository);
    mockUnitRepository.getAll.mockReturnValue([
      {
        id: 'any id',
        title: 'any title',
        explanation: 'any explanation',
        createAt: 'any create',
        updateAt: 'any update',
      },
    ]);

    const result = await listUnitService.execute();

    expect(result.length).toEqual(1);
    expect(mockUnitRepository.getAll).toHaveBeenCalledTimes(1);
  });
});
