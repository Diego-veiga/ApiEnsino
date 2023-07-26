/* eslint-disable no-unused-vars */

import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUnitRepository from '../domain/repository/IUnitRepository';

@injectable()
export default class DeleteUnitService {
  constructor(
    @inject('UnitRepository') private unitRepository: IUnitRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const unitExist = await this.unitRepository.getById(id);
    if (!unitExist) {
      throw new AppError('Unit not found');
    }
    await this.unitRepository.delete(id);
  }
}
