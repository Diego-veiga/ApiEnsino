/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';
import ISubjectToSubjectViewMapper from '../domain/mappers/ISubjectToSubjectView.mapper';
import ISubjectRepository from '../domain/Repository/ISubjectsRepository';
import SubjectView from '../domain/View/SubjectView';

@injectable()
export default class ShowSubjectService {
  constructor(
    @inject('SubjectRepository')
    private subjectRepository: ISubjectRepository,
    @inject('SubjectToSubjectViewMapper')
    private subjectToSubjectViewMapper: ISubjectToSubjectViewMapper,
  ) {}

  async execute(id: string): Promise<SubjectView | null> {
    const subject = await this.subjectRepository.findOne(id);
    if (subject) {
      return this.subjectToSubjectViewMapper.mapperSubjectToSubjectView(
        subject,
      );
    }
    return null;
  }
}
