import 'reflect-metadata';
import DeleteUnitService from '@modules/unit/services/DeleteUnitservies';
import { AppError } from '@shared/errors/AppError';

const mockUnitRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  findByName: jest.fn(),
};

describe('DeleteUnitService', () => {
  it('should get unit with id', async () => {
    const deleteUnitService = new DeleteUnitService(mockUnitRepository);
    mockUnitRepository.findOne.mockReturnValue({
      id: 'any id',
      title: 'any title',
      explanation: 'any explanation',
      createAt: 'any create',
      updateAt: 'any update',
    });

    await deleteUnitService.execute('any id');

    expect(mockUnitRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockUnitRepository.delete).toHaveBeenCalledTimes(1);
  });

  it('delete Unit not existing ', async () => {
    const deleteUnitService = new DeleteUnitService(mockUnitRepository);
    mockUnitRepository.findOne.mockReturnValue(null);

    await deleteUnitService.execute('anu id').catch(e => {
      expect(e).toBeInstanceOf(AppError);
      expect(e).toMatchObject({
        message: 'Unit not found',
      });
    });

    expect(mockUnitRepository.findOne).toBeCalledTimes(1);
    expect(mockUnitRepository.delete).toBeCalledTimes(0);
  });
});
