import ICreateUserSubjects from '@modules/userSubjects/domain/ICreateUserSubjects';
import { IUserSubject } from '@modules/userSubjects/domain/IUserSubjects';
import IUserSubjectsRepository from '@modules/userSubjects/domain/IUserSubjectsRepository';
import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import UserSubjects from '../entities/userSubject';

export default class UserSubjectsRepository implements IUserSubjectsRepository {
  private ormRepository: Repository<UserSubjects>;
  constructor() {
    this.ormRepository = dataSource.getRepository(UserSubjects);
  }
  async create(createUserSubjects: ICreateUserSubjects): Promise<void> {
    const newUserSubject = this.ormRepository.create(createUserSubjects);
    await this.ormRepository.save(newUserSubject);
  }
  async getUserAndSubject(
    userId: string,
    subjectId: string,
  ): Promise<IUserSubject | null> {
    return await this.ormRepository.findOne({ where: { userId, subjectId } });
  }
}
