/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';
import ICreateUnit from '../domain/ICreateUnit';
import IUnitRepository from '../domain/repository/IUnitRepository';

@injectable()
export default class CreateUnitService {
  constructor(
    @inject('UnitRepository') private unitRepository: IUnitRepository,
  ) {}

  async execute({ title, explanation }: ICreateUnit): Promise<void> {
    const newUnit = {
      title,
      explanation,
    } as ICreateUnit;

    await this.unitRepository.save(newUnit);
  }
}
