import { classes } from '@automapper/classes';
import { createMapper, mapFrom } from '@automapper/core';
import Subject from '../infra/typeorm/entities/subject';
import SubjectView from '../domain/SubjectView';
import ISubjectToSubjectViewMapper from '../domain/mappers/ISubjectToSubjectView.mapper';

const mapper = createMapper({
  name: 'mapper',
  pluginInitializer: classes,
});

mapper
  .createMap(Subject, SubjectView)
  .forMember(
    dest => dest.id,
    mapFrom(src => src.id),
  )
  .forMember(
    dest => dest.name,
    mapFrom(src => src.name),
  )
  .forMember(
    dest => dest.area,
    mapFrom(src => src.area),
  )
  .forMember(
    dest => dest.creationDate,
    mapFrom(src => src.create_at),
  )
  .forMember(
    dest => dest.updateDate,
    mapFrom(src => src.update_at),
  );

export class SubjectToSubjectViewMapper implements ISubjectToSubjectViewMapper {
  mapperSubjectToSubjectView(model: Subject): SubjectView {
    return mapper.map(model, SubjectView, Subject);
  }
}
