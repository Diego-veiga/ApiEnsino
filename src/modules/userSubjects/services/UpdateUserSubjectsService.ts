/* eslint-disable no-unused-vars */
import ISubjectRepository from '@modules/subjects/domain/Repository/ISubjectsRepository';
import IUsersRepository from '@modules/users/domain/Repository/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IRequestUpdateUserSubjects from '../domain/Request/IRequestUpdateUserSubject';
import IUserSubjectsRepository from '../domain/Repository/IUserSubjectsRepository';
import UserSubjects from '../infra/typeorm/entities/userSubject';
import IUserSubjectToUserSubjectViewMapper from '../domain/Mappers/IUserSubjectToUserSubjectView';
import UserSubjectView from '../domain/View/UserSubjectView';

@injectable()
export default class UpdateUserSubjectsService {
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
    id,
    userId,
    subjectId,
    grade,
  }: IRequestUpdateUserSubjects): Promise<UserSubjectView> {
    const userSubjectExist = await this.userSubjectsRepository.findOne(id);
    if (!userSubjectExist) {
      throw new AppError('enrollment not found.', 403);
    }

    const userExist = await this.userRepository.findOne(userId);
    if (!userExist) {
      throw new AppError('User not found.', 403);
    }
    const subjectExist = await this.subjectRepository.findOne(subjectId);
    if (!subjectExist) {
      throw new AppError('Subject not found.', 403);
    }
    if (grade < 0) {
      throw new AppError('Grade must be positive.', 403);
    }
    const userWithSubjectExist =
      await this.userSubjectsRepository.getUserSubject(userId, subjectId);

    if (userWithSubjectExist) {
      throw new AppError('Student already registered for this subject.', 403);
    }
    const userSubjectUpdateModel = {
      id,
      user: userExist,
      subject: subjectExist,
      grade,
      subjectId,
      userId,
    } as UserSubjects;

    const userSubjectUpdated = await this.userSubjectsRepository.update(
      userSubjectUpdateModel,
    );

    return this.userSubjectToUserSubjectViewMapper.mapperUserSubjectToUserSubjectView(
      userSubjectUpdated,
    );
  }
}
