/* eslint-disable no-unused-vars */
import IUnitRepository from '@modules/unit/domain/repository/IUnitRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICreateLesson from '../domain/ICreateLesson';
import IRequestCreateLesson from '../domain/IRequestCreateLesson';
import ILessonRepository from '../domain/repository/ILessonRepository';

@injectable()
export default class CreateLessonService {
  constructor(
    @inject('LessonRepository') private lessonRepository: ILessonRepository,
    @inject('UnitRepository') private unitRepository: IUnitRepository,
  ) {}
  async execute({ description, unitId }: IRequestCreateLesson): Promise<void> {
    const unitExist = await this.unitRepository.getById(unitId);

    if (!unitExist) {
      throw new AppError('Unit does not exist', 400);
    }
    const createLesson = {
      description,
      numberQuestions: 0,
      progress: 0,
      unitId,
    } as ICreateLesson;
    await this.lessonRepository.create(createLesson);
  }
}
