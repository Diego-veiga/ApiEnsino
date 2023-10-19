/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';
import IUserToUserViewMapper from '../domain/mappers/IUserToUserView.mapper';
import IUsersRepository from '../domain/Repository/IUsersRepository';
import UserView from '../domain/View/UserView';

@injectable()
export default class ListUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
    @inject('UserToUserViewMapper')
    private userToUserViewMapper: IUserToUserViewMapper,
  ) {}

  async execute(): Promise<UserView[]> {
    const usersView: UserView[] = [];
    const usersDate = await this.userRepository.findAll();
    if (usersDate.length) {
      usersDate.forEach(userData => {
        usersView.push(
          this.userToUserViewMapper.mapperUserToUserView(userData),
        );
      });
    }

    return usersView;
  }
}
