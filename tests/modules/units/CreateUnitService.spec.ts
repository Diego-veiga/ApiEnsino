import 'reflect-metadata';
import CreateUnitService from '@modules/unit/services/CreateUnitservies';
import Unit from '@modules/unit/infra/typeorm/entities/Unit';

const mockUnitRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  findByName: jest.fn(),
};

describe('CreateUnitService', () => {
  it('should create unit', async () => {
    const createUnitService = new CreateUnitService(mockUnitRepository);
    mockUnitRepository.create.mockReturnValue({
      id: 'any',
      title: 'any title',
      explanation: 'any explanation',
      active: true,
      create_at: new Date(),
      update_at: new Date(),
    } as Unit);

    const userCreated = await createUnitService.execute({
      title: 'any title',
      explanation: 'any explanation',
    });

    expect(mockUnitRepository.create).toHaveBeenCalledTimes(1);
    expect(userCreated.title).toEqual('any title');
    expect(userCreated.explanation).toEqual('any explanation');
  });
});
