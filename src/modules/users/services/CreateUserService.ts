/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../domain/repositories/IUsersRepository';
import { ICreateUser } from '../domain/Request/ICreateUsers';
import { AppError } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import IRebbit from '@shared/messaging/Interface/IRabbit';
import User from '../infra/typeorm/entities/user';
import { generatedId } from '@shared/infra/utils/generateId';
import IUserToUserViewMapper from '../domain/mappers/IUserToUserView.mapper';
import UserView from '../domain/View/UserView';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
    @inject('Rebbit')
    private Rebbit: IRebbit,
    @inject('UserToUserViewMapper')
    private userToUserViewMapper: IUserToUserViewMapper,
  ) {}

  async execute({
    name,
    lastName,
    email,
    password,
  }: ICreateUser): Promise<UserView> {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new AppError(
        'There is already a user registered with this email address',
      );
    }

    password = await hash(password, 8);
    const user = {
      id: generatedId(),
      name,
      lastName,
      email,
      password,
      active: true,
    } as User;

    const userCreated = await this.userRepository.create(user);

    await this.Rebbit.publishInExchange(
      'amq.direct',
      'newUser',
      JSON.stringify(userCreated),
    );
    return this.userToUserViewMapper.mapperUserToUserView(userCreated);
  }
}
