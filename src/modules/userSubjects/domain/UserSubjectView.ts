import UserSubjectSubjectView from './UserSubjectSubjectView';
import UserSubjectUserView from './UserSubjectUserView';

export default class UserSubjectView {
  id: string;
  user: UserSubjectUserView;
  subject: UserSubjectSubjectView;
  grade: number;
  create: Date;
  update: Date;
}
