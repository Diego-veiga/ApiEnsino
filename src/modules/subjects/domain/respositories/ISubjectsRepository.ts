/* eslint-disable no-unused-vars */
import ICreateSubject from '../ICreateSubject';
import IUpdateSubject from '../IUpdateSubject';
import SubjectView from '../SubjectView';

export default interface ISubjectRepository {
  create(subject: ICreateSubject): Promise<void>;
  findAll(): Promise<SubjectView[]>;
  findById(id: string): Promise<SubjectView | null>;
  findByName(name: string): Promise<SubjectView | null>;
  delete(id: string): Promise<void>;
  update(subject: IUpdateSubject): Promise<void>;
}
