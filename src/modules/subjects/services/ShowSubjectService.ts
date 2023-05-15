import { inject, injectable } from 'tsyringe';
import ISubjectRepository from '../domain/respositories/ISubjectsRepository';
import SubjectView from '../domain/SubjectView';

@injectable()
export default class ShowSubjectService {
  constructor(
    @inject('SubjectRepository')
    private subjectRepository: ISubjectRepository,
  ) {}

  async execute(id: string): Promise<SubjectView | null> {
    return await this.subjectRepository.findById(id);
  }
}
