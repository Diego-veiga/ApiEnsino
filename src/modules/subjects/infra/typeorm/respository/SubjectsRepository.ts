/* eslint-disable no-unused-vars */
import ISubjectRepository from '@modules/subjects/domain/respositories/ISubjectsRepository';
import Subject from '../entities/subject';
import BaseRepository from '@shared/infra/typeorm/repository/BaseRepository';

export default class SubjectsRepository
  extends BaseRepository<Subject>
  implements ISubjectRepository
{
  constructor() {
    super(Subject);
  }
  async findByName(name: string): Promise<Subject | null> {
    return this.ormRepository.findOne({ where: { name } });
  }
}
