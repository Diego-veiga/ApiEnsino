/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';
import IUserSubjectsRepository from '../domain/IUserSubjectsRepository';
import UserSubjectView from '../domain/UserSubjectView';

@injectable()
export default class ListUserSubjectService {
  constructor(
    @inject('UserSubjectsRepository')
    private userSubjectsRepository: IUserSubjectsRepository,
  ) {}
  async execute(): Promise<UserSubjectView[]> {
    return await this.userSubjectsRepository.getAll();
  }
}
