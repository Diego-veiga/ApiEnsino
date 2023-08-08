/* eslint-disable no-unused-vars */
import ISubjectRepository from '@modules/subjects/domain/respositories/ISubjectsRepository';
import IUsersRepository from '@modules/users/domain/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IRequestCreateUserSubjects from '../domain/IRequestCreateUserSubjects';
import IUserSubjectsRepository from '../domain/IUserSubjectsRepository';

@injectable()
export default class CreateUserSubjects {
  constructor(
    @inject('UserSubjectsRepository')
    private userSubjectsRepository: IUserSubjectsRepository,
    @inject('SubjectRepository')
    private subjectRepository: ISubjectRepository,
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}
  async execute(createUserSubjects: IRequestCreateUserSubjects): Promise<void> {
    const user = await this.userRepository.findById(createUserSubjects.userId);
    if (!user) {
      throw new AppError('User not found', 403);
    }
    const subject = await this.subjectRepository.findById(
      createUserSubjects.subjectId,
    );
    if (!subject) {
      throw new AppError('Subject not found', 403);
    }
    const userSubject = await this.userSubjectsRepository.getUserAndSubject(
      createUserSubjects.userId,
      createUserSubjects.subjectId,
    );
    if (userSubject) {
      throw new AppError('Student already registered in this subject', 403);
    }
    const userSubjects = {
      subject,
      user,
    };

    await this.userSubjectsRepository.create(userSubjects);
  }
}
