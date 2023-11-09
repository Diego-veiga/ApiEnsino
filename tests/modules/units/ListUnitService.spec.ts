import 'reflect-metadata';
import ListUnitService from '@modules/unit/services/ListUnitservies';

const mockUnitRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  findByName: jest.fn(),
};

describe('ListUnitService', () => {
  it('list all unit ', async () => {
    const listUnitService = new ListUnitService(mockUnitRepository);
    mockUnitRepository.findAll.mockReturnValue([
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
    expect(mockUnitRepository.findAll).toHaveBeenCalledTimes(1);
  });
});
