/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';
import LessonView from '../domain/View/LessonView';
import ILessonRepository from '../domain/Repository/ILessonRepository';

@injectable()
export default class ListLessonService {
  constructor(
    @inject('LessonRepository') private lessonRepository: ILessonRepository,
  ) {}
  async execute(): Promise<LessonView[]> {
    return await this.lessonRepository.findAll();
  }
}
