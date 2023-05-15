import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import ISubjectRepository from '../domain/respositories/ISubjectsRepository';
import IUpdateSubject from '../domain/IUpdateSubject';

@injectable()
export default class UpdateSubjectService {
  constructor(
    @inject('SubjectRepository')
    private subjectRepository: ISubjectRepository,
  ) {}

  async execute({ id, name, area }: IUpdateSubject): Promise<void> {
    const userExist = await this.subjectRepository.findById(id);

    if (!userExist) {
      throw new AppError('Subject does not exist');
    }
    const existSubjectWithName = await this.subjectRepository.findByName(name);

    if (existSubjectWithName && existSubjectWithName.id !== id) {
      throw new AppError(
        'There is already a subject registered with this name',
      );
    }

    await this.subjectRepository.update({
      id,
      name,
      area,
    });
  }
}
