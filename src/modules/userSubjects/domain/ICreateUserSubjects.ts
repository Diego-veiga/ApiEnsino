import SubjectView from '@modules/subjects/domain/SubjectView';
import UserView from '@modules/users/domain/UserView';

export default interface ICreateUserSubjects {
  user: UserView;
  subject: SubjectView;
}
