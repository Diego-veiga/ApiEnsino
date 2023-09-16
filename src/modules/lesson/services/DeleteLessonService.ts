/* eslint-disable no-unused-vars */
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ILessonRepository from '../domain/repository/ILessonRepository';

@injectable()
export default class DeleteLessonService {
  constructor(
    @inject('LessonRepository') private lessonRepository: ILessonRepository,
  ) {}
  async execute(id: string): Promise<void> {
    const unitExist = await this.lessonRepository.getById(id);

    if (!unitExist) {
      throw new AppError('Unit does not exist', 400);
    }

    await this.lessonRepository.delete(id);
  }
}
