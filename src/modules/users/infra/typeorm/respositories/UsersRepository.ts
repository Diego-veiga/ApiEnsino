import { generatedId } from './../../../../../shared/infra/utils/generateId';
import IUsersRepository from '@modules/users/domain/repositories/IUsersRepository';
import { Repository } from 'typeorm';
import User from '../entities/user';
import { dataSource } from '@shared/infra/typeorm';
import { ICreateUser } from '@modules/users/domain/ICreateUsers';
import { inject, injectable } from 'tsyringe';
import { UserToUserViewMapper } from '@modules/users/mappers/userToUserView.mappper';
import UserView from '@modules/users/domain/UserView';
import { IUpdateUser } from '@modules/users/domain/IUpdateUsers';

@injectable()
export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor(
    @inject('UserToUserViewMapper')
    private userToUserViewMapper: UserToUserViewMapper,
  ) {
    this.ormRepository = dataSource.getRepository(User);
  }

  async create(user: ICreateUser): Promise<User> {
    const newUser = this.ormRepository.create(user);
    newUser.id = generatedId();

    return await this.ormRepository.save(newUser);
  }
  async findByEmail(email: string): Promise<UserView | null> {
    const userData = await this.ormRepository.findOne({ where: { email } });
    if (userData) {
      return this.userToUserViewMapper.mapperUserToUserView(userData);
    }
    return null;
  }

  async findAll(): Promise<UserView[]> {
    const usersView: UserView[] = [];
    const usersData = await this.ormRepository.find();
    if (usersData.length) {
      usersData.forEach(ud => {
        usersView.push(this.userToUserViewMapper.mapperUserToUserView(ud));
      });
    }
    return usersView;
  }
  async findById(id: string): Promise<UserView | null> {
    const userData = await this.ormRepository.findOne({
      where: {
        id,
      },
    });
    if (userData) {
      return this.userToUserViewMapper.mapperUserToUserView(userData);
    }
    return null;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(User)
      .set({
        active: false,
      })
      .where('id = :id', { id: id })
      .execute();
  }

  async update(user: IUpdateUser): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(User)
      .set({
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      })
      .where('id = :id', { id: user.id })
      .execute();
  }
}
