import { IUnit } from '@modules/Unit/domain/IUnit';
import IUnitRepository from '@modules/Unit/domain/Respository/IUnitRepository';
/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';

@injectable()
export default class ListUnitService {
  constructor(
    @inject('UnitRepository') private unitRepository: IUnitRepository,
  ) { }

  async execute(): Promise<IUnit[]> {
    return await this.unitRepository.findAll();
  }
}
