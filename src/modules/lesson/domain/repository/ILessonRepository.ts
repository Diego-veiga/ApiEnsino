/* eslint-disable no-unused-vars */
import ICreateLesson from '../ICreateLesson';
import LessonView from '../LessonView';

export default interface ILessonRepository {
  create(lesson: ICreateLesson): Promise<void>;
  getById(id: string): Promise<LessonView | null>;
  getAll(): Promise<LessonView[]>;
  delete(id: string): Promise<void>;
}
