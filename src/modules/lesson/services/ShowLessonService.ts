/* eslint-disable no-unused-vars */
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import LessonView from '../domain/View/LessonView';
import ILessonRepository from '../domain/Repository/ILessonRepository';

@injectable()
export default class ShowLessonService {
  constructor(
    @inject('LessonRepository') private lessonRepository: ILessonRepository,
  ) {}

  async execute(id: string): Promise<LessonView> {
    const lesson = await this.lessonRepository.findOne(id);
    if (!lesson) {
      throw new AppError('lesson not found', 404);
    }
    return lesson;
  }
}
