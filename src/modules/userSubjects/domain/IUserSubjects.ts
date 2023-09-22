import ISubject from '@modules/subjects/domain/ISubject';
import IUser from '@modules/users/domain/IUser';

export interface IUserSubject {
  id: string;
  userId: string;
  subjectId: string;
  grade: number;
  user: IUser;
  subject: ISubject;
  active: boolean;
  create_at: Date;
  update_at: Date;
}
