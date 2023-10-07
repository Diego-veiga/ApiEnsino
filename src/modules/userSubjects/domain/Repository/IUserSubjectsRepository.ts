/* eslint-disable no-unused-vars */
import IBaseRepository from '@shared/domain/repository/IBaseRepository';
import UserSubjects from '../../infra/typeorm/entities/userSubject';

export default interface IUserSubjectsRepository
  extends IBaseRepository<UserSubjects> {
  getUserSubject(
    userId: string,
    subjectId: string,
  ): Promise<UserSubjects | null>;

  getAllUserSubject(): Promise<UserSubjects[]>;
}
