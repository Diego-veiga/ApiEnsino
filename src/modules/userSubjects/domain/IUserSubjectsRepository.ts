/* eslint-disable no-unused-vars */
import ICreateUserSubjects from './ICreateUserSubjects';
import { IUserSubject } from './IUserSubjects';

export default interface IUserSubjectsRepository {
  create(createUserSubjects: ICreateUserSubjects): Promise<void>;
  getUserAndSubject(
    userId: string,
    subjectId: string,
  ): Promise<IUserSubject | null>;
}
