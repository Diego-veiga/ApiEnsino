/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';
import IUserSubjectToUserSubjectViewMapper from '@modules/userSubjects/domain/mappers/IUserSubjectToUserSubjectView';
import IUserSubjectsRepository from '../domain/Repository/IUserSubjectsRepository';
import UserSubjectView from '../domain/View/UserSubjectView';

@injectable()
export default class ListUserSubjectService {
  constructor(
    @inject('UserSubjectsRepository')
    private userSubjectsRepository: IUserSubjectsRepository,
    @inject('UserSubjectToUserSubjectViewMapper')
    private userSubjectToUserSubjectViewMapper: IUserSubjectToUserSubjectViewMapper,
  ) {}
  async execute(): Promise<UserSubjectView[]> {
    const userSubjectListView: UserSubjectView[] = [];
    const userSubjectsDate =
      await this.userSubjectsRepository.getAllUserSubject();
    if (!userSubjectsDate.length) {
      return userSubjectListView;
    }
    for (const userSubject of userSubjectsDate) {
      userSubjectListView.push(
        this.userSubjectToUserSubjectViewMapper.mapperUserSubjectToUserSubjectView(
          userSubject,
        ),
      );
    }
    return userSubjectListView;
  }
}
