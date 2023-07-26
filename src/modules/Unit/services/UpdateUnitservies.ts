/* eslint-disable no-unused-vars */
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUpdateUnit from '../domain/IUpdateUnit';
import IUnitRepository from '../domain/repository/IUnitRepository';

@injectable()
export default class UpdateUnitService {
  constructor(
    @inject('UnitRepository') private unitRepository: IUnitRepository,
  ) {}

  async execute({ id, title, explanation }: IUpdateUnit): Promise<void> {
    const unitExist = await this.unitRepository.getById(id);
    if (!unitExist) {
      throw new AppError('Unit not found');
    }
    await this.unitRepository.update({ id, title, explanation });
  }
}
