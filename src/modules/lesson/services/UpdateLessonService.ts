/* eslint-disable no-unused-vars */
import IUnitRepository from '@modules/unit/domain/Respository/IUnitRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUpdateLessonRequest from '../domain/Request/IUpdateLessonRequest';
import ILessonRepository from '../domain/Repository/ILessonRepository';
import Lesson from '../infra/typeorm/Entities/lesson';
import ILessonToLessonViewMapper from '../domain/Mappers/ILessonToLessonViewMapper';
import LessonView from '../domain/View/LessonView';

@injectable()
export default class UpdateLessonService {
  constructor(
    @inject('LessonRepository') private lessonRepository: ILessonRepository,
    @inject('UnitRepository') private unitRepository: IUnitRepository,
    @inject('LessonToLessonViewMapper')
    private lessonToLessonViewMapper: ILessonToLessonViewMapper,
  ) {}

  async execute({
    id,
    description,
    unitId,
  }: IUpdateLessonRequest): Promise<LessonView> {
    const lessonExist = await this.lessonRepository.findOne(id);
    if (!lessonExist) {
      throw new AppError('lesson not found', 404);
    }
    const unitExist = await this.unitRepository.findOne(unitId);
    if (!unitExist) {
      throw new AppError('unit not found', 404);
    }
    lessonExist.description = description;
    lessonExist.unitId = unitId;
    const lessonUpdated = await this.lessonRepository.update(lessonExist);
    return this.lessonToLessonViewMapper.mapperLessonToLessonView(
      lessonUpdated,
    );
  }
}
