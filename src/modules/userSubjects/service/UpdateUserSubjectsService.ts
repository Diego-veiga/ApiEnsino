/* eslint-disable no-unused-vars */
import ISubjectRepository from '@modules/subjects/domain/respositories/ISubjectsRepository';
import IUsersRepository from '@modules/users/domain/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IRequestUpdateUserSubjects from '../domain/IRequestUpdateUserSubject';
import IUpdateUserSubjects from '../domain/IUpdateUserSubjects';
import IUserSubjectsRepository from '../domain/IUserSubjectsRepository';

@injectable()
export default class UpdateUserSubjectsService {
  constructor(
    @inject('UserSubjectsRepository')
    private userSubjectsRepository: IUserSubjectsRepository,
    @inject('SubjectRepository')
    private subjectRepository: ISubjectRepository,
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}
  async execute({
    id,
    userId,
    subjectId,
    grade,
  }: IRequestUpdateUserSubjects): Promise<void> {
    const userSubjectExist = await this.userSubjectsRepository.getById(id);
    if (!userSubjectExist) {
      throw new AppError('enrollment not found.', 403);
    }

    const userExist = await this.userRepository.findById(userId);
    if (!userExist) {
      throw new AppError('User not found.', 403);
    }
    const subjectExist = await this.subjectRepository.findById(subjectId);
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
    const userSubjectUpdateModel: IUpdateUserSubjects = {
      id,
      user: userExist,
      subject: subjectExist,
      grade,
    };

    await this.userSubjectsRepository.update(userSubjectUpdateModel);
  }
}
