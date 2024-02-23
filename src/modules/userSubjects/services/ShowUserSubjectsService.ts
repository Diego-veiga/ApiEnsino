/* eslint-disable no-unused-vars */
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IRequestShowUserSubjects from '../domain/Request/IRequestShowUserSubjects';
import IUserSubjectsRepository from '../domain/Repository/IUserSubjectsRepository';
import UserSubjectView from '../domain/View/UserSubjectView';
import IUserSubjectToUserSubjectViewMapper from '@modules/userSubjects/domain/mappers/IUserSubjectToUserSubjectView';

@injectable()
export default class ShowUserSubjectsService {
  constructor(
    @inject('UserSubjectsRepository')
    private userSubjectsRepository: IUserSubjectsRepository,
    @inject('UserSubjectToUserSubjectViewMapper')
    private userSubjectToUserSubjectViewMapper: IUserSubjectToUserSubjectViewMapper,
  ) { }
  async execute({
    userId,
    subjectId,
  }: IRequestShowUserSubjects): Promise<UserSubjectView> {
    const userSubjects = await this.userSubjectsRepository.getUserSubject(
      userId,
      subjectId,
    );

    if (!userSubjects) {
      throw new AppError('user not registered for this subject');
    }

    return this.userSubjectToUserSubjectViewMapper.mapperUserSubjectToUserSubjectView(
      userSubjects,
    );
  }
}
