/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';
import LessonView from '../domain/LessonView';
import ILessonRepository from '../domain/repository/ILessonRepository';

@injectable()
export default class ListLessonService {
  constructor(
    @inject('LessonRepository') private lessonRepository: ILessonRepository,
  ) {}
  async execute(): Promise<LessonView[]> {
    return await this.lessonRepository.getAll();
  }
}
