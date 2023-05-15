import { generatedId } from './../../../../../shared/infra/utils/generateId';
import { Repository } from 'typeorm';
import { dataSource } from '@shared/infra/typeorm';
import { inject, injectable } from 'tsyringe';
import ISubjectRepository from '@modules/subjects/domain/respositories/ISubjectsRepository';
import ICreateSubject from '@modules/subjects/domain/ICreateSubject';
import SubjectView from '@modules/subjects/domain/SubjectView';
import Subject from '../entities/subject';
import { area } from '@modules/subjects/domain/enum/area';
import ISubjectToSubjectViewMapper from '@modules/subjects/domain/mappers/ISubjectToSubjectView.mapper';
import IUpdateSubject from '@modules/subjects/domain/IUpdateSubject';

@injectable()
export default class SubjectsRepository implements ISubjectRepository {
  private ormRepository: Repository<Subject>;

  constructor(
    @inject('SubjectToSubjectViewMapper')
    private subjectToSubjectViewMapper: ISubjectToSubjectViewMapper,
  ) {
    this.ormRepository = dataSource.getRepository(Subject);
  }
  async findByName(name: string): Promise<SubjectView | null> {
    const subjectData = await this.ormRepository.findOne({
      where: {
        name,
      },
    });
    if (subjectData) {
      return this.subjectToSubjectViewMapper.mapperSubjectToSubjectView(
        subjectData,
      );
    }
    return null;
  }

  async create(subject: ICreateSubject): Promise<void> {
    const newSubject = this.ormRepository.create(subject);
    newSubject.id = generatedId();

    await this.ormRepository.save(newSubject);
  }
  async findByArea(area: area): Promise<SubjectView | null> {
    const subjectData = await this.ormRepository.findOne({ where: { area } });
    if (subjectData) {
      return this.subjectToSubjectViewMapper.mapperSubjectToSubjectView(
        subjectData,
      );
    }
    return null;
  }

  async findAll(): Promise<SubjectView[]> {
    const subjectView: SubjectView[] = [];
    const subjectsData = await this.ormRepository.find();
    if (subjectsData.length) {
      subjectsData.forEach(sd => {
        subjectView.push(
          this.subjectToSubjectViewMapper.mapperSubjectToSubjectView(sd),
        );
      });
    }
    return subjectView;
  }
  async findById(id: string): Promise<SubjectView | null> {
    const subjectData = await this.ormRepository.findOne({
      where: {
        id,
      },
    });
    if (subjectData) {
      return this.subjectToSubjectViewMapper.mapperSubjectToSubjectView(
        subjectData,
      );
    }
    return null;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(Subject)
      .set({
        active: false,
      })
      .where('id = :id', { id: id })
      .execute();
  }

  async update(subject: IUpdateSubject): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(Subject)
      .set({
        name: subject.name,
        area: subject.area,
      })
      .where('id = :id', { id: subject.id })
      .execute();
  }
}
