import SubjectView from '@modules/subjects/domain/View/SubjectView';
import UserView from '@modules/users/domain/View/UserView';

export default class UserSubjectView {
  id: string;
  user: UserView;
  subject: SubjectView;
  grade: number;
  create: Date;
  update: Date;
}
