import 'reflect-metadata';
import { LessonToLessonViewMapper } from '@modules/lesson/mappers/LessonToLessonView.mapper';
import ILesson from '@modules/lesson/domain/ILesson';
import LessonView from '@modules/lesson/domain/LessonView';

describe('LessonToLessonViewMapper', () => {
  it('Must return the LessonView', async () => {
    const lesson = {
      id: '1',
      description: 'any description',
      numberQuestions: 0,
      progress: 0.0,
      unitId: '12',
      active: true,
      create_at: new Date(),
      update_at: new Date(),
    } as ILesson;

    const lessonView = {
      id: '1',
      description: 'any description',
      numberQuestions: 0,
      progress: 0.0,
      unitId: '12',
      active: true,
      create_at: new Date(),
      update_at: new Date(),
    } as LessonView;

    const lessonToLessonViewMapper = new LessonToLessonViewMapper();

    const result = lessonToLessonViewMapper.mapperLessonToLessonView(lesson);

    expect(result).toEqual(lessonView);
  });
});
