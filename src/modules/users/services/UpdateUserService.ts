/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../domain/Repository/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { IUpdateUser } from '../domain/Request/IUpdateUsers';
import { hash } from 'bcryptjs';
import IUserToUserViewMapper from '../domain/mappers/IUserToUserView.mapper';
import UserView from '../domain/View/UserView';

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
    @inject('UserToUserViewMapper')
    private userToUserViewMapper: IUserToUserViewMapper,
  ) {}

  async execute({
    id,
    name,
    lastName,
    email,
    password,
  }: IUpdateUser): Promise<UserView> {
    const userExist = await this.userRepository.findOne(id);

    if (!userExist) {
      throw new AppError('User does not exist');
    }
    const existUseWithEmail = await this.userRepository.findByEmail(email);

    if (existUseWithEmail && existUseWithEmail.id !== id) {
      throw new AppError(
        'There is already a user registered with this e-mail address',
      );
    }
    userExist.name = name;
    userExist.lastName = lastName;
    userExist.email = email;
    userExist.password = await hash(password, 8);

    const userUpdated = await this.userRepository.update(userExist);
    return this.userToUserViewMapper.mapperUserToUserView(userUpdated);
  }
}
