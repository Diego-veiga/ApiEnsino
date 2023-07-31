import 'reflect-metadata';
import DeleteUnitService from '@modules/unit/services/DeleteUnitservies';
import { AppError } from '@shared/errors/AppError';

const mockUnitRepository = {
  save: jest.fn(),
  update: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
  delete: jest.fn(),
};

describe('DeleteUnitService', () => {
  it('should get unit with id', async () => {
    const deleteUnitService = new DeleteUnitService(mockUnitRepository);
    mockUnitRepository.getById.mockReturnValue({
      id: 'any id',
      title: 'any title',
      explanation: 'any explanation',
      createAt: 'any create',
      updateAt: 'any update',
    });

    await deleteUnitService.execute('any id');

    expect(mockUnitRepository.getById).toHaveBeenCalledTimes(1);
    expect(mockUnitRepository.delete).toHaveBeenCalledTimes(1);
  });

  it('delete Unit not existing ', async () => {
    const deleteUnitService = new DeleteUnitService(mockUnitRepository);
    mockUnitRepository.getById.mockReturnValue(null);

    await deleteUnitService.execute('anu id').catch(e => {
      expect(e).toBeInstanceOf(AppError);
      expect(e).toMatchObject({
        message: 'Unit not found',
      });
    });

    expect(mockUnitRepository.getById).toBeCalledTimes(1);
    expect(mockUnitRepository.update).toBeCalledTimes(0);
  });
});
