import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../domain/repositories/IUsersRepository';
import { ICreateUser } from '../domain/ICreateUsers';
import { AppError } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import IRebbit from '@shared/messaging/Interface/IRabbit';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
    @inject('Rebbit')
    private Rebbit: IRebbit,
  ) {}

  async execute({
    name,
    lastName,
    email,
    password,
  }: ICreateUser): Promise<void> {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new AppError(
        'There is already a user registered with this email address',
      );
    }

    password = await hash(password, 8);

    const userCreated = await this.userRepository.create({
      name,
      lastName,
      email,
      password,
    });

    await this.Rebbit.publishInExchange(
      'amq.direct',
      'newUser',
      JSON.stringify(userCreated),
    );
  }
}
