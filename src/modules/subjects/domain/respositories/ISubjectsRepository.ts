/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable no-unused-vars */
import Subject from '@modules/subjects/infra/typeorm/entities/subject';
import IBaseRepository from '@shared/domain/repository/IBaseRepository';

export default interface ISubjectRepository extends IBaseRepository<Subject> {
  findByName(name: string): Promise<Subject | null>;
}
