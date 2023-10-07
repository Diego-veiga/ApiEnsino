/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import ISubjectRepository from '../domain/Repository/ISubjectsRepository';

@injectable()
export default class DeleteSubjectService {
  constructor(
    @inject('SubjectRepository')
    private subjectRepository: ISubjectRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const subjectExist = await this.subjectRepository.findOne(id);

    if (!subjectExist) {
      throw new AppError('Subject does not exist');
    }

    await this.subjectRepository.delete(id);
  }
}
