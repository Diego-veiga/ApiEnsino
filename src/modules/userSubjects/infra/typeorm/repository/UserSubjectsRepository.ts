/* eslint-disable no-unused-vars */
import ICreateUserSubjects from '@modules/userSubjects/domain/ICreateUserSubjects';
import IUserSubjectsRepository from '@modules/userSubjects/domain/IUserSubjectsRepository';
import IUserSubjectView from '@modules/userSubjects/domain/UserSubjectView';
import IUserSubjectToUserSubjectViewMapper from '@modules/userSubjects/domain/mappers/IUserSubjectToUserSubjectView';
import { dataSource } from '@shared/infra/typeorm';
import { inject, injectable } from 'tsyringe';
import { Repository, Tree } from 'typeorm';
import UserSubjects from '../entities/userSubject';
import IUpdateUserSubjects from '@modules/userSubjects/domain/IUpdateUserSubjects';

@injectable()
export default class UserSubjectsRepository implements IUserSubjectsRepository {
  private ormRepository: Repository<UserSubjects>;
  constructor(
    @inject('UserSubjectToUserSubjectViewMapper')
    private userSubjectToUserSubjectViewMapper: IUserSubjectToUserSubjectViewMapper,
  ) {
    this.ormRepository = dataSource.getRepository(UserSubjects);
  }

  async create(createUserSubjects: ICreateUserSubjects): Promise<void> {
    const newUserSubject = this.ormRepository.create(createUserSubjects);
    await this.ormRepository.save(newUserSubject);
  }
  async getUserSubject(
    userId: string,
    subjectId: string,
  ): Promise<IUserSubjectView | null> {
    const userSubjectModel = await this.ormRepository.findOne({
      where: { userId, subjectId },
      relations: { user: true, subject: true },
    });

    if (userSubjectModel) {
      return this.userSubjectToUserSubjectViewMapper.mapperUserSubjectToUserSubjectView(
        userSubjectModel,
      );
    } else {
      return null;
    }
  }

  async getAll(): Promise<IUserSubjectView[]> {
    const userSubjectsView: IUserSubjectView[] = [];
    const userSubjectModels = await this.ormRepository.find({
      relations: { user: true, subject: true },
    });

    if (userSubjectModels.length) {
      for (const userSubjectModel of userSubjectModels) {
        userSubjectsView.push(
          this.userSubjectToUserSubjectViewMapper.mapperUserSubjectToUserSubjectView(
            userSubjectModel,
          ),
        );
      }
    }
    return userSubjectsView;
  }

  async getById(id: string): Promise<IUserSubjectView | null> {
    const userSubjectModel = await this.ormRepository.findOne({
      where: { id },
      relations: { user: true, subject: true },
    });

    if (userSubjectModel) {
      return this.userSubjectToUserSubjectViewMapper.mapperUserSubjectToUserSubjectView(
        userSubjectModel,
      );
    } else {
      return null;
    }
  }
  async delete(id: string): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(UserSubjects)
      .set({
        active: false,
      })
      .where('id = :id', { id: id })
      .execute();
  }
  async update(updateUserSubject: IUpdateUserSubjects): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(UserSubjects)
      .set({
        userId: updateUserSubject.user.id,
        subjectId: updateUserSubject.subject.id,
        grade: updateUserSubject.grade,
        active: true,
      })
      .where('id = :id', { id: updateUserSubject.id })
      .execute();
  }
}
