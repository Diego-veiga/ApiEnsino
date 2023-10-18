import 'reflect-metadata';
import UpdateUnitService from '@modules/unit/services/UpdateUnitservies';
import { AppError } from '@shared/errors/AppError';
const mockUnitRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  findByName: jest.fn(),
};

describe('Update Unit Service ', () => {
  it('update Unit successfully', async () => {
    const updateUnitService = new UpdateUnitService(mockUnitRepository);
    mockUnitRepository.findOne.mockReturnValue({
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

    expect(mockUnitRepository.findOne).toBeCalledTimes(1);
    expect(mockUnitRepository.update).toBeCalledTimes(1);
  });

  it('update Unit not existing ', async () => {
    const updateUnitService = new UpdateUnitService(mockUnitRepository);
    mockUnitRepository.findOne.mockReturnValue(null);

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

    expect(mockUnitRepository.findOne).toBeCalledTimes(1);
    expect(mockUnitRepository.update).toBeCalledTimes(0);
  });
});
