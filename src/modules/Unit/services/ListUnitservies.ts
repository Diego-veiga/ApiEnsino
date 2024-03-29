/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';
import { IUnit } from '../domain/IUnit';
import IUnitRepository from '../domain/Respository/IUnitRepository';

@injectable()
export default class ListUnitService {
  constructor(
    @inject('UnitRepository') private unitRepository: IUnitRepository,
  ) {}

  async execute(): Promise<IUnit[]> {
    return await this.unitRepository.findAll();
  }
}
