/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import ISubjectRepository from '../domain/Repository/ISubjectsRepository';
import ICreateSubject from '../domain/Request/ICreateSubject';
import Subject from '../infra/typeorm/entities/subject';
import ISubjectToSubjectViewMapper from '../domain/Mappers/ISubjectToSubjectView.mapper';
import SubjectView from '../domain/View/SubjectView';

@injectable()
export default class CreateSubjectService {
  constructor(
    @inject('SubjectRepository')
    private subjectRepository: ISubjectRepository,
    @inject('SubjectToSubjectViewMapper')
    private subjectToSubjectViewMapper: ISubjectToSubjectViewMapper,
  ) {}

  async execute({ name, area }: ICreateSubject): Promise<SubjectView> {
    const subjectExists = await this.subjectRepository.findByName(name);

    if (subjectExists) {
      throw new AppError(
        'There is already a subject registered with this name',
      );
    }
    const newSubject = {
      name,
      area,
    } as Subject;

    const subjectCreated = await this.subjectRepository.create(newSubject);
    return this.subjectToSubjectViewMapper.mapperSubjectToSubjectView(
      subjectCreated,
    );
  }
}
