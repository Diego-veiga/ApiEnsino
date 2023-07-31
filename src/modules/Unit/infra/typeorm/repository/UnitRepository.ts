import ICreateUnit from '@modules/unit/domain/ICreateUnit';
import { IUnit } from '@modules/unit/domain/IUnit';
import IUpdateUnit from '@modules/unit/domain/IUpdateUnit';
import IUnitRepository from '@modules/unit/domain/repository/IUnitRepository';
import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import Unit from '../entities/Unit';

export default class UnitRepository implements IUnitRepository {
  private ormRepository: Repository<Unit>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Unit);
  }

  async save(unit: ICreateUnit): Promise<void> {
    await this.ormRepository.save(unit);
  }
  async update(unitUpdate: IUpdateUnit): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(Unit)
      .set({
        title: unitUpdate.title,
        explanation: unitUpdate.explanation,
      })
      .where('id = :id', { id: unitUpdate.id })
      .execute();
  }
  async getById(id: string): Promise<IUnit | null> {
    return await this.ormRepository.findOne({ where: { id } });
  }
  async getAll(): Promise<IUnit[]> {
    return await this.ormRepository.find();
  }
  async delete(id: string): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(Unit)
      .set({ active: false })
      .where('id = :id', { id })
      .execute();
  }
}
