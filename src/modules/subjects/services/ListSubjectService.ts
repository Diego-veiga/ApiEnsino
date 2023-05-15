import { inject, injectable } from 'tsyringe';
import ISubjectRepository from '../domain/respositories/ISubjectsRepository';
import SubjectView from '../domain/SubjectView';

@injectable()
export default class ListSubjectService {
  constructor(
    @inject('SubjectRepository')
    private subjectRepository: ISubjectRepository,
  ) {}

  async execute(): Promise<SubjectView[]> {
    return await this.subjectRepository.findAll();
  }
}
