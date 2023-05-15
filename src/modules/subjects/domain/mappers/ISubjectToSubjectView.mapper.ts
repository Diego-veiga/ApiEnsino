import ISubject from '../ISubject';
import SubjectView from '../SubjectView';

export default interface ISubjectToSubjectViewMapper {
  mapperSubjectToSubjectView(model: ISubject): SubjectView;
}
