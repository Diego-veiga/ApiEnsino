import SubjectView from '@modules/subjects/domain/SubjectView';
import UserView from '@modules/users/domain/UserView';

export default interface IUpdateUserSubjects {
  id: string;
  user: UserView;
  subject: SubjectView;
  grade: number;
}
