import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../domain/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
export default class DeleteUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const userExist = await this.userRepository.findById(id);

    if (!userExist) {
      throw new AppError('User does not exist');
    }

    await this.userRepository.delete(id);
  }
}
