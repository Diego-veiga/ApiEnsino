/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable no-unused-vars */
import Lesson from '@modules/lesson/infra/typeorm/Entities/lesson';
import IBaseRepository from '@shared/domain/repository/IBaseRepository';

export default interface ILessonRepository extends IBaseRepository<Lesson> {}
