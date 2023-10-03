/* eslint-disable no-unused-vars */
import ILesson from '../ILesson';
import LessonView from '../View/LessonView';

export default interface ILessonToLessonViewMapper {
  mapperLessonToLessonView(model: ILesson): LessonView;
}
