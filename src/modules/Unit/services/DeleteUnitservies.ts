/* eslint-disable no-unused-vars */

import { inject, injectable } from 'tsyringe';
import { IUnit } from '../domain/IUnit';
import IUnitRepository from '../domain/repository/IUnitRepository';

@injectable()
export default class DeleteUnitService {
  constructor(
    @inject('UnitRepository') private unitRepository: IUnitRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.unitRepository.delete(id);
  }
}
