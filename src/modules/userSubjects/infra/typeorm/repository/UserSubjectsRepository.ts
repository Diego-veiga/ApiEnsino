/* eslint-disable no-unused-vars */
import IUserSubjectsRepository from '@modules/userSubjects/domain/Repository/IUserSubjectsRepository';
import { injectable } from 'tsyringe';
import UserSubjects from '../entities/userSubject';
import BaseRepository from '@shared/infra/typeorm/repository/BaseRepository';

@injectable()
export default class UserSubjectsRepository
  extends BaseRepository<UserSubjects>
  implements IUserSubjectsRepository
{
  constructor() {
    super(UserSubjects);
  }
  async getAllUserSubject(): Promise<UserSubjects[]> {
    return this.ormRepository.find({
      relations: { user: true, subject: true },
    });
  }

  async getUserSubject(
    userId: string,
    subjectId: string,
  ): Promise<UserSubjects | null> {
    return await this.ormRepository.findOne({
      where: { userId, subjectId },
      relations: { user: true, subject: true },
    });
  }
}
