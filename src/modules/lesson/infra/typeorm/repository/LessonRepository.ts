/* eslint-disable no-unused-vars */
import ICreateLesson from '@modules/lesson/domain/ICreateLesson';
import ILessonToLessonViewMapper from '@modules/lesson/domain/ILessonToLessonViewMapper';
import LessonView from '@modules/lesson/domain/LessonView';
import ILessonRepository from '@modules/lesson/domain/repository/ILessonRepository';
import { dataSource } from '@shared/infra/typeorm';
import { inject, injectable } from 'tsyringe';
import { Repository } from 'typeorm';
import Lesson from '../Entities/lesson';

@injectable()
export default class LessonRepository implements ILessonRepository {
  ormRepository: Repository<Lesson>;

  constructor(
    @inject('LessonToLessonViewMapper')
    private LessonToLessonViewMapper: ILessonToLessonViewMapper,
  ) {
    this.ormRepository = dataSource.getRepository(Lesson);
  }

  async create(lesson: ICreateLesson): Promise<void> {
    const newLesson = this.ormRepository.create(lesson);
    await this.ormRepository.save(newLesson);
  }
  async getById(id: string): Promise<LessonView | null> {
    const lessonData = await this.ormRepository.findOne({ where: { id } });
    if (!lessonData) {
      return null;
    }
    return this.LessonToLessonViewMapper.mapperLessonToLessonView(lessonData);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(Lesson)
      .set({
        active: false,
      })
      .where('id = :id', { id: id })
      .execute();
  }
}
