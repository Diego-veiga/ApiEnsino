import { classes } from '@automapper/classes';
import { createMapper, mapFrom } from '@automapper/core';
import ILessonToLessonViewMapper from '../domain/Mappers/ILessonToLessonViewMapper';
import ILesson from '../domain/ILesson';
import LessonView from '../domain/View/LessonView';
import Lesson from '../infra/typeorm/Entities/lesson';

const mapper = createMapper({
  name: 'mapper',
  pluginInitializer: classes,
});

mapper
  .createMap(Lesson, LessonView)
  .forMember(
    dest => dest.id,
    mapFrom(src => src.id),
  )
  .forMember(
    dest => dest.description,
    mapFrom(src => src.description),
  )
  .forMember(
    dest => dest.progress,
    mapFrom(src => src.progress),
  )
  .forMember(
    dest => dest.numberQuestions,
    mapFrom(src => src.numberQuestions),
  )
  .forMember(
    dest => dest.unitId,
    mapFrom(src => src.unitId),
  )
  .forMember(
    dest => dest.active,
    mapFrom(src => src.active),
  )
  .forMember(
    dest => dest.create_at,
    mapFrom(src => src.create_at),
  )
  .forMember(
    dest => dest.update_at,
    mapFrom(src => src.update_at),
  );

export class LessonToLessonViewMapper implements ILessonToLessonViewMapper {
  mapperLessonToLessonView(model: ILesson): LessonView {
    return mapper.map(model, LessonView, Lesson);
  }
}
