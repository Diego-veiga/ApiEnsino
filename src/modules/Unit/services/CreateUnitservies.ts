/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';
import ICreateUnit from '@modules/Unit/domain/Request/ICreateUnit';
import IUnitRepository from '@modules/Unit/domain/Respository/IUnitRepository';
import Unit from '../infra/typeorm/entities/Unit';

@injectable()
export default class CreateUnitService {
  constructor(
    @inject('UnitRepository') private unitRepository: IUnitRepository,
  ) { }

  async execute({ title, explanation }: ICreateUnit): Promise<Unit> {
    const newUnit = {
      title,
      explanation,
    } as Unit;

    return await this.unitRepository.create(newUnit);
  }
}
