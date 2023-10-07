import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../domain/Repository/IUsersRepository';
import UserView from '../domain/UserView';

@injectable()
export default class ShowUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}

  async execute(id: string): Promise<UserView | null> {
    return await this.userRepository.findById(id);
  }
}
