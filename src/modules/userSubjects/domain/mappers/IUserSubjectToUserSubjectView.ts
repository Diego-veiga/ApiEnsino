/* eslint-disable no-unused-vars */

import UserSubjects from '@modules/userSubjects/infra/typeorm/entities/userSubject';
import UserSubjectView from '../UserSubjectView';

export default interface IUserSubjectToUserSubjectViewMapper {
  mapperUserSubjectToUserSubjectView(model: UserSubjects): UserSubjectView;
}
