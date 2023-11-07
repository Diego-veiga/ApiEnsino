import ISubject from '@modules/subjects/domain/ISubject';
import IUser from '@modules/users/domain/IUser';

export interface IUserSubject {
  userId: string;
  subjectId: string;
  grade: number;
  user: IUser;
  subject: ISubject;
}
