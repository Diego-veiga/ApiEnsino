/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';
import IUserToUserViewMapper from '../domain/mappers/IUserToUserView.mapper';
import IUsersRepository from '../domain/Repository/IUsersRepository';
import UserView from '../domain/View/UserView';

@injectable()
export default class ShowUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
    @inject('UserToUserViewMapper')
    private userToUserViewMapper: IUserToUserViewMapper,
  ) {}

  async execute(id: string): Promise<UserView | null> {
    const userData = await this.userRepository.findOne(id);
    if (userData) {
      return this.userToUserViewMapper.mapperUserToUserView(userData);
    }
    return null;
  }
}
