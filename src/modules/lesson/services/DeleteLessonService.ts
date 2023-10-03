/* eslint-disable no-unused-vars */
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ILessonRepository from '../domain/Repository/ILessonRepository';

@injectable()
export default class DeleteLessonService {
  constructor(
    @inject('LessonRepository') private lessonRepository: ILessonRepository,
  ) {}
  async execute(id: string): Promise<void> {
    const lessonExist = await this.lessonRepository.findOne(id);

    if (!lessonExist) {
      throw new AppError('Lesson does not exist', 404);
    }

    await this.lessonRepository.delete(id);
  }
}
