import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../domain/repositories/IUsersRepository';
import UserView from '../domain/UserView';

@injectable()
export default class ListUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}

  async execute(): Promise<UserView[]> {
    return await this.userRepository.findAll();
  }
}
