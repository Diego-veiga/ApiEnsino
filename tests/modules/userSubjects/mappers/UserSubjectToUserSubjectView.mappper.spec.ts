import { area } from '@modules/subjects/domain/enum/area';
import UserSubjectViewMapper from '@modules/userSubjects/mappers/userSubjectView.mapper';

describe('UserSubjectToUserSubjectViewMapper', () => {
  it('Must return the UserSubjectView', async () => {
    const userSubject = {
      id: '123',
      userId: '456',
      subjectId: '789',
      grade: 14,
      active: true,
      user: {
        id: '321',
        name: 'any name user',
        lastName: 'any lastName user',
        email: 'anyemail@teste.com',
        active: true,
        password: '123456',
        create_at: new Date(),
        update_at: new Date(),
      },
      subject: {
        id: '741',
        name: 'any subject',
        area: area.exact,
        active: true,
        create_at: new Date(),
        update_at: new Date(),
      },
      create_at: new Date(),
      update_at: new Date(),
    };

    const userSubjectView = {
      id: '123',
      user: { id: '321', name: 'any name user' },
      subject: { id: '741', name: 'any subject', area: area.exact },
      grade: 14,
      create: userSubject.create_at,
      update: userSubject.update_at,
    };

    const userSubjectViewMapper = new UserSubjectViewMapper();

    const result =
      userSubjectViewMapper.mapperUserSubjectToUserSubjectView(userSubject);

    expect(result).toEqual(userSubjectView);
  });
});
