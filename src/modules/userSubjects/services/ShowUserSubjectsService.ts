/* eslint-disable no-unused-vars */
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IRequestShowUserSubjects from '../domain/IRequestShowUserSubjects';
import IUserSubjectsRepository from '../domain/IUserSubjectsRepository';

@injectable()
export default class ShowUserSubjectsService {
  constructor(
    @inject('UserSubjectsRepository')
    private userSubjectsRepository: IUserSubjectsRepository,
  ) {}
  async execute({ userId, subjectId }: IRequestShowUserSubjects): Promise<any> {
    const userSubjects = await this.userSubjectsRepository.getUserSubject(
      userId,
      subjectId,
    );

    if (!userSubjects) {
      throw new AppError('user not registered for this subject');
    }
    return userSubjects;
  }
}
