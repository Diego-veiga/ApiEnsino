/* eslint-disable no-unused-vars */
import IUsersRepository from '@modules/users/domain/repositories/IUsersRepository';
import User from '../entities/user';
import { injectable } from 'tsyringe';
import BaseRepository from '@shared/infra/typeorm/repository/BaseRepository';

@injectable()
export default class UsersRepository
  extends BaseRepository<User>
  implements IUsersRepository
{
  constructor() {
    super(User);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.ormRepository.findOne({ where: { email } });
  }
}
