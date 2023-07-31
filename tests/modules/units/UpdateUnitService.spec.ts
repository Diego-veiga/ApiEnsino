import 'reflect-metadata';
import UpdateUnitService from '@modules/unit/services/UpdateUnitservies';
import { AppError } from '@shared/errors/AppError';

describe('Update Unit Service ', () => {
  const mockUnitRepository = {
    save: jest.fn(),
    update: jest.fn(),
    getById: jest.fn(),
    getAll: jest.fn(),
    delete: jest.fn(),
  };
  it('update Unit successfully', async () => {
    const updateUnitService = new UpdateUnitService(mockUnitRepository);
    mockUnitRepository.getById.mockReturnValue({
      id: 'anu id',
      title: 'any update',
      explanation: 'any explanation',
    });
    mockUnitRepository.update.mockReturnValue(null);

    await updateUnitService.execute({
      id: 'any id',
      title: 'any update',
      explanation: 'any explanation',
    });

    expect(mockUnitRepository.getById).toBeCalledTimes(1);
    expect(mockUnitRepository.update).toBeCalledTimes(1);
  });

  it('update Unit not existing ', async () => {
    const updateUnitService = new UpdateUnitService(mockUnitRepository);
    mockUnitRepository.getById.mockReturnValue(null);

    await updateUnitService
      .execute({
        id: 'anu id',
        title: 'any update',
        explanation: 'any explanation',
      })
      .catch(e => {
        expect(e).toBeInstanceOf(AppError);
        expect(e).toMatchObject({
          message: 'Unit not found',
        });
      });

    expect(mockUnitRepository.getById).toBeCalledTimes(1);
    expect(mockUnitRepository.update).toBeCalledTimes(0);
  });
});
