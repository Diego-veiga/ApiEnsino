/* eslint-disable no-unused-vars */
import ISubjectRepository from '@modules/subjects/domain/Repository/ISubjectsRepository';
import IUsersRepository from '@modules/users/domain/Repository/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IRequestCreateUserSubjects from '../domain/Request/IRequestCreateUserSubjects';
import IUserSubjectsRepository from '../domain/Repository/IUserSubjectsRepository';
import IUserSubjectToUserSubjectViewMapper from '../domain/Mappers/IUserSubjectToUserSubjectView';
import UserSubjectView from '../domain/View/UserSubjectView';
import UserSubjects from '../infra/typeorm/entities/userSubject';

@injectable()
export default class CreateUserSubjects {
  constructor(
    @inject('UserSubjectsRepository')
    private userSubjectsRepository: IUserSubjectsRepository,
    @inject('SubjectRepository')
    private subjectRepository: ISubjectRepository,
    @inject('UserRepository')
    private userRepository: IUsersRepository,
    @inject('UserSubjectToUserSubjectViewMapper')
    private userSubjectToUserSubjectViewMapper: IUserSubjectToUserSubjectViewMapper,
  ) {}
  async execute({
    subjectId,
    userId,
  }: IRequestCreateUserSubjects): Promise<UserSubjectView> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new AppError('User not found', 403);
    }
    const subject = await this.subjectRepository.findOne(subjectId);
    if (!subject) {
      throw new AppError('Subject not found', 403);
    }
    const userSubject = await this.userSubjectsRepository.getUserSubject(
      userId,
      subjectId,
    );
    if (userSubject) {
      throw new AppError('Student already registered in this subject', 403);
    }
    const userSubjects = {
      grade: 0,
      userId,
      subjectId,
      user,
      subject,
    } as UserSubjects;

    const userSubjectCreated = await this.userSubjectsRepository.create(
      userSubjects,
    );

    return this.userSubjectToUserSubjectViewMapper.mapperUserSubjectToUserSubjectView(
      userSubjectCreated,
    );
  }
}
