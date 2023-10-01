import SubjectView from '@modules/subjects/domain/View/SubjectView';
import UserView from '@modules/users/domain/View/UserView';

export default interface IUpdateUserSubjects {
  id: string;
  user: UserView;
  subject: SubjectView;
  grade: number;
}
