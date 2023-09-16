import ICreateLesson from '@modules/lesson/domain/ICreateLesson';
import ILessonRepository from '@modules/lesson/domain/repository/ILessonRepository';
import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import Lesson from '../Entities/lesson';

export default class LessonRepository implements ILessonRepository {
  ormRepository: Repository<Lesson>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Lesson);
  }
  async create(lesson: ICreateLesson): Promise<void> {
    const newLesson = this.ormRepository.create(lesson);
    await this.ormRepository.save(newLesson);
  }
}
