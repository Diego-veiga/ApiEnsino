/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';
import ISubjectToSubjectViewMapper from '../domain/mappers/ISubjectToSubjectView.mapper';
import ISubjectRepository from '../domain/Repository/ISubjectsRepository';
import SubjectView from '../domain/View/SubjectView';

@injectable()
export default class ListSubjectService {
  constructor(
    @inject('SubjectRepository')
    private subjectRepository: ISubjectRepository,
    @inject('SubjectToSubjectViewMapper')
    private subjectToSubjectViewMapper: ISubjectToSubjectViewMapper,
  ) {}

  async execute(): Promise<SubjectView[]> {
    const subjectView: SubjectView[] = [];
    const listSubject = await this.subjectRepository.findAll();
    listSubject.forEach(subject => {
      subjectView.push(
        this.subjectToSubjectViewMapper.mapperSubjectToSubjectView(subject),
      );
    });

    return subjectView;
  }
}
