/* eslint-disable no-unused-vars */
import { classes } from '@automapper/classes';
import { createMapper, mapFrom } from '@automapper/core';
import Subject from '@modules/subjects/infra/typeorm/entities/subject';
import User from '@modules/users/infra/typeorm/entities/user';
import IUserSubjectToUserSubjectViewMapper from '../domain/mappers/IUserSubjectToUserSubjectView';
import UserSubjectSubjectView from '../domain/UserSubjectSubjectView';
import UserSubjectUserView from '../domain/UserSubjectUserView';
import UserSubjectView from '../domain/UserSubjectView';
import UserSubjects from '../infra/typeorm/entities/userSubject';

const mapper = createMapper({
  name: 'mapper',
  pluginInitializer: classes,
});

function getUser(user: User): UserSubjectUserView {
  return {
    id: user.id,
    name: user.name,
  };
}
function getSubject(subject: Subject): UserSubjectSubjectView {
  return {
    id: subject.id,
    name: subject.name,
    area: subject.area,
  };
}

mapper
  .createMap(UserSubjects, UserSubjectView)
  .forMember(
    dest => dest.id,
    mapFrom(src => src.id),
  )
  .forMember(
    dest => dest.user,
    mapFrom(src => getUser(src.user)),
  )
  .forMember(
    dest => dest.subject,
    mapFrom(src => getSubject(src.subject)),
  )
  .forMember(
    dest => dest.grade,
    mapFrom(src => src.grade),
  )

  .forMember(
    dest => dest.create,
    mapFrom(src => src.create_at),
  )
  .forMember(
    dest => dest.update,
    mapFrom(src => src.update_at),
  );

export default class UserSubjectViewMapper
  implements IUserSubjectToUserSubjectViewMapper
{
  mapperUserSubjectToUserSubjectView(model: UserSubjects): UserSubjectView {
    return mapper.map(model, UserSubjectView, UserSubjects);
  }
}
