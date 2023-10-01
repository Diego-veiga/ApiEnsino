/* eslint-disable no-unused-vars */
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUpdateUnit from '../domain/Request/IUpdateUnit';
import IUnitRepository from '../domain/repository/IUnitRepository';
import Unit from '../infra/typeorm/entities/Unit';

@injectable()
export default class UpdateUnitService {
  constructor(
    @inject('UnitRepository') private unitRepository: IUnitRepository,
  ) {}

  async execute({ id, title, explanation }: IUpdateUnit): Promise<Unit> {
    const unitExist = await this.unitRepository.findOne(id);
    if (!unitExist) {
      throw new AppError('Unit not found');
    }
    unitExist.title = title;
    unitExist.explanation = explanation;
    return await this.unitRepository.update(unitExist);
  }
}
