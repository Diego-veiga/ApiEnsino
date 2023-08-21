/* eslint-disable no-unused-vars */
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUserSubjectsRepository from '../domain/IUserSubjectsRepository';

@injectable()
export default class DeleteUserSubjectsService {
  constructor(
    @inject('UserSubjectsRepository')
    private userSubjectsRepository: IUserSubjectsRepository,
  ) {}
  async execute(id: string): Promise<void> {
    const userSubjectExist = await this.userSubjectsRepository.getById(id);
    if (!userSubjectExist) {
      throw new AppError('enrollment not found');
    }

    await this.userSubjectsRepository.delete(id);
  }
}
