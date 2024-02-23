/* eslint-disable no-unused-vars */
import IUnitRepository from '@modules/Unit/domain/Respository/IUnitRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ILessonToLessonViewMapper from '@modules/lesson/domain/mappers/ILessonToLessonViewMapper';
import ILessonRepository from '@modules/lesson/domain/repository/ILessonRepository';
import IRequestCreateLesson from '../domain/Request/IRequestCreateLesson';
import LessonView from '../domain/View/LessonView';
import Lesson from '../infra/typeorm/Entities/lesson';

@injectable()
export default class CreateLessonService {
  constructor(
    @inject('LessonRepository') private lessonRepository: ILessonRepository,
    @inject('UnitRepository') private unitRepository: IUnitRepository,
    @inject('LessonToLessonViewMapper')
    private lessonToLessonViewMapper: ILessonToLessonViewMapper,
  ) { }
  async execute({
    description,
    unitId,
  }: IRequestCreateLesson): Promise<LessonView> {
    const unitExist = await this.unitRepository.findOne(unitId);

    if (!unitExist) {
      throw new AppError('Unit does not exist', 400);
    }
    const createLesson = {
      description,
      numberQuestions: 0,
      progress: 0,
      unitId,
    } as Lesson;
    const lessonCreated = await this.lessonRepository.create(createLesson);
    return this.lessonToLessonViewMapper.mapperLessonToLessonView(
      lessonCreated,
    );
  }
}
