/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';
import LessonView from '../domain/View/LessonView';
import ILessonToLessonViewMapper from '@modules/lesson/domain/mappers/ILessonToLessonViewMapper';
import ILessonRepository from '@modules/lesson/domain/repository/ILessonRepository';

@injectable()
export default class ListLessonService {
  constructor(
    @inject('LessonRepository') private lessonRepository: ILessonRepository,
    @inject('LessonToLessonViewMapper')
    private lessonToLessonViewMapper: ILessonToLessonViewMapper,
  ) { }
  async execute(): Promise<LessonView[]> {
    const lessonsView: LessonView[] = [];
    const lessonsData = await this.lessonRepository.findAll();
    if (!lessonsData.length) return lessonsView;

    for (const lessonData of lessonsData) {
      lessonsView.push(
        this.lessonToLessonViewMapper.mapperLessonToLessonView(lessonData),
      );
    }
    return lessonsView;
  }
}
