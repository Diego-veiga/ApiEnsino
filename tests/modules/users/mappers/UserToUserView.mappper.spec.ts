import 'reflect-metadata';
import { UserToUserViewMapper } from '@modules/users/Mappers/userToUserView.mappper';

describe('UserToUserViewMapper', () => {
  it('Must return the UserView', async () => {
    const user = {
      id: '123',
      name: 'teste',
      lastName: 'string',
      email: 'teste@teste.com',
      password: '123456',
      active: true,
      create_at: new Date(),
      update_at: new Date(),
    };
    const userView = {
      id: '123',
      name: 'teste',
      lastName: 'string',
      email: 'teste@teste.com',
      password: '123456',
      active: true,
      creationDate: new Date(),
      updateDate: new Date(),
    };

    const userToUserViewMapper = new UserToUserViewMapper();

    const result = userToUserViewMapper.mapperUserToUserView(user);

    expect(result).toEqual(userView);
  });
});
