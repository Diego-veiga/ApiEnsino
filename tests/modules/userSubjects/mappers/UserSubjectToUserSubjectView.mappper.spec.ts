import { area } from '@modules/subjects/domain/enum/area';
import UserSubjects from '@modules/userSubjects/infra/typeorm/entities/userSubject';
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
        id: '147',
        name: 'teste',
        lastName: 'string',
        email: 'teste@teste.com',
        password: '123456',
        active: true,
        create_at: new Date(),
        update_at: new Date(),
      },
      subject: {
        id: '1',
        name: 'math',
        area: area.human,
        active: true,
        create_at: new Date(),
        update_at: new Date(),
      },
      create_at: new Date(),
      update_at: new Date(),
    } as UserSubjects;

    const userSubjectView = {
      id: '123',
      user: {
        id: '147',
        name: 'teste',
        lastName: 'string',
        email: 'teste@teste.com',
        active: true,
      },
      subject: {
        id: '1',
        name: 'math',
        area: area.human,
      },
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
