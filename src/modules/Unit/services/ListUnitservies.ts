/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';
import ICreateUnit from '../domain/ICreateUnit';
import { IUnit } from '../domain/IUnit';
import IUnitRepository from '../domain/repository/IUnitRepository';

@injectable()
export default class ListUnitService {
  constructor(
    @inject('UnitRepository') private unitRepository: IUnitRepository,
  ) {}

  async execute(): Promise<IUnit[]> {
    return await this.unitRepository.getAll();
  }
}
