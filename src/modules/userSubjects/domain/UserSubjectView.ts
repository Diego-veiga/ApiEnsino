import ISubject from '@modules/subjects/domain/ISubject';
import IUser from '@modules/users/domain/IUser';

export default class UserSubjectView {
  id: string;
  user: IUser;
  subject: ISubject;
  grade: number;
  create: Date;
  update: Date;
}
