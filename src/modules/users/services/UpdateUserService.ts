import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../domain/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { IUpdateUser } from '../domain/IUpdateUsers';

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}

  async execute({
    id,
    name,
    lastName,
    email,
    password,
  }: IUpdateUser): Promise<void> {
    const userExist = await this.userRepository.findById(id);

    if (!userExist) {
      throw new AppError('User does not exist');
    }
    const existUseWithEmail = await this.userRepository.findByEmail(email);

    if (existUseWithEmail && existUseWithEmail.id !== id) {
      throw new AppError(
        'There is already a user registered with this e-mail address',
      );
    }

    await this.userRepository.update({ id, name, lastName, email, password });
  }
}
