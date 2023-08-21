/* eslint-disable no-unused-vars */
import ICreateUserSubjects from './ICreateUserSubjects';
import IUpdateUserSubjects from './IUpdateUserSubjects';
import IUserSubjectView from './UserSubjectView';

export default interface IUserSubjectsRepository {
  create(createUserSubjects: ICreateUserSubjects): Promise<void>;
  getUserSubject(
    userId: string,
    subjectId: string,
  ): Promise<IUserSubjectView | null>;
  getAll(): Promise<IUserSubjectView[]>;
  getById(id: string): Promise<IUserSubjectView | null>;
  delete(id: string): Promise<void>;
  update(updateUserSubject: IUpdateUserSubjects): Promise<void>;
}
