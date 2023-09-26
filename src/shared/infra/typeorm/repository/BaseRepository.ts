/* eslint-disable no-unused-vars */
import IBaseRepository from '@shared/domain/repository/IBaseRepository';
import { generatedId } from '@shared/infra/utils/generateId';
import {
  DeepPartial,
  EntityTarget,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { dataSource } from '..';
import BaseEntity from '../entities/BaseEntity';

export default abstract class BaseRepository<T extends BaseEntity>
  implements IBaseRepository<T>
{
  private ormRepository: Repository<T>;

  constructor(entity: EntityTarget<T>) {
    this.ormRepository = dataSource.getRepository(entity);
  }

  async create(obj: T): Promise<T> {
    const newEntity = this.ormRepository.create(obj);
    newEntity.id = generatedId();

    return await this.ormRepository.save(newEntity);
  }
  async findAll(): Promise<T[]> {
    let entity: T[] = [];
    entity = await this.ormRepository.find();
    return entity;
  }
  async findOne(id: string): Promise<T | null> {
    return await this.ormRepository.findOneBy({ id } as FindOptionsWhere<T>);
  }
  async delete(id: string): Promise<void> {
    const entity = await this.ormRepository.findOneBy({
      id,
    } as FindOptionsWhere<T>);
    entity!.active = false;
    await this.ormRepository.save(entity as DeepPartial<T>);
  }
  async update(obj: T): Promise<T> {
    return this.ormRepository.save(obj);
  }
}
