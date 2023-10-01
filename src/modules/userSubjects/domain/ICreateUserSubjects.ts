import SubjectView from '@modules/subjects/domain/View/SubjectView';
import UserView from '@modules/users/domain/View/UserView';

export default interface ICreateUserSubjects {
  user: UserView;
  subject: SubjectView;
}
