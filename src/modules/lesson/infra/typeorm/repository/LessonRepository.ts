/* eslint-disable no-unused-vars */
import BaseRepository from '@shared/infra/typeorm/repository/BaseRepository';
import ILessonRepository from '@modules/lesson/domain/Repository/ILessonRepository';
import { injectable } from 'tsyringe';
import Lesson from '../Entities/lesson';

@injectable()
export default class LessonRepository
  extends BaseRepository<Lesson>
  implements ILessonRepository
{
  constructor() {
    super(Lesson);
  }
}
