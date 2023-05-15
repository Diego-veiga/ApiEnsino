import { classes } from '@automapper/classes';
import { createMapper, mapFrom } from '@automapper/core';
import UserView from '../domain/UserView';
import User from '../infra/typeorm/entities/user';
import IUserToUserViewMapper from '../domain/mappers/IUserToUserView.mapper';

const mapper = createMapper({
  name: 'mapper',
  pluginInitializer: classes,
});

mapper
  .createMap(User, UserView)
  .forMember(
    dest => dest.id,
    mapFrom(src => src.id),
  )
  .forMember(
    dest => dest.name,
    mapFrom(src => src.name),
  )
  .forMember(
    dest => dest.lastName,
    mapFrom(src => src.lastName),
  )
  .forMember(
    dest => dest.email,
    mapFrom(src => src.email),
  )
  .forMember(
    dest => dest.password,
    mapFrom(src => src.password),
  )
  .forMember(
    dest => dest.active,
    mapFrom(src => src.active),
  )
  .forMember(
    dest => dest.creationDate,
    mapFrom(src => src.create_at),
  )
  .forMember(
    dest => dest.updateDate,
    mapFrom(src => src.update_at),
  );

export class UserToUserViewMapper implements IUserToUserViewMapper {
  mapperUserToUserView(model: User): UserView {
    return mapper.map(model, UserView, User);
  }
}
