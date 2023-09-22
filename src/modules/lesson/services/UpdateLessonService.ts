/* eslint-disable no-unused-vars */
import IUnitRepository from '@modules/unit/domain/repository/IUnitRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUpdateLesson from '../domain/IUpdateLesson';
import IUpdateLessonRequest from '../domain/IUpdateLessonRequest';
import ILessonRepository from '../domain/repository/ILessonRepository';

@injectable()
export default class UpdateLessonService {
  constructor(
    @inject('LessonRepository') private lessonRepository: ILessonRepository,
    @inject('UnitRepository') private unitRepository: IUnitRepository,
  ) {}

  async execute({
    id,
    description,
    unitId,
  }: IUpdateLessonRequest): Promise<void> {
    const lessonExist = await this.lessonRepository.getById(id);
    if (!lessonExist) {
      throw new AppError('lesson not found', 404);
    }
    const unitExist = await this.unitRepository.getById(unitId);
    if (!unitExist) {
      throw new AppError('unit not found', 404);
    }
    const lessonUpdate = {
      id,
      description,
      unitId,
    } as IUpdateLesson;
    await this.lessonRepository.update(lessonUpdate);
  }
}
