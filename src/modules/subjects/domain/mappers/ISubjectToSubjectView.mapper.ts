/* eslint-disable no-unused-vars */
import ISubject from '../ISubject';
import SubjectView from '../View/SubjectView';

export default interface ISubjectToSubjectViewMapper {
  mapperSubjectToSubjectView(model: ISubject): SubjectView;
}
