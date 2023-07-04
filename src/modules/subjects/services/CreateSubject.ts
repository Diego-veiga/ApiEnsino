import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import ISubjectRepository from '../domain/respositories/ISubjectsRepository';
import ICreateSubject from '../domain/ICreateSubject';

@injectable()
export default class CreateSubjectService {
  constructor(
    @inject('SubjectRepository')
    private subjectRepository: ISubjectRepository,
  ) {}

  async execute({ name, area }: ICreateSubject): Promise<void> {
    const subjectExists = await this.subjectRepository.findByName(name);

    if (subjectExists) {
      throw new AppError(
        'There is already a subject registered with this name',
      );
    }

    await this.subjectRepository.create({ name, area });
  }
}
