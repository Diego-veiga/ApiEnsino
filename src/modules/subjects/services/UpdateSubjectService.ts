/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import ISubjectRepository from '../domain/Repository/ISubjectsRepository';
import IUpdateSubject from '../domain/Request/IUpdateSubject';
import ISubjectToSubjectViewMapper from '../domain/Mappers/ISubjectToSubjectView.mapper';
import SubjectView from '../domain/View/SubjectView';

@injectable()
export default class UpdateSubjectService {
  constructor(
    @inject('SubjectRepository')
    private subjectRepository: ISubjectRepository,
    @inject('SubjectToSubjectViewMapper')
    private subjectToSubjectViewMapper: ISubjectToSubjectViewMapper,
  ) {}

  async execute({ id, name, area }: IUpdateSubject): Promise<SubjectView> {
    const subjectExist = await this.subjectRepository.findOne(id);

    if (!subjectExist) {
      throw new AppError('Subject does not exist');
    }
    const existSubjectWithName = await this.subjectRepository.findByName(name);

    if (existSubjectWithName && existSubjectWithName.id !== id) {
      throw new AppError(
        'There is already a subject registered with this name',
      );
    }
    subjectExist.name = name;
    subjectExist.area = area;

    const subjectUpdated = await this.subjectRepository.update(subjectExist);
    return this.subjectToSubjectViewMapper.mapperSubjectToSubjectView(
      subjectUpdated,
    );
  }
}
