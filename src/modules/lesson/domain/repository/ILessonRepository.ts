/* eslint-disable no-unused-vars */
import ICreateLesson from '../ICreateLesson';

export default interface ILessonRepository {
  create(lesson: ICreateLesson): Promise<void>;
}
