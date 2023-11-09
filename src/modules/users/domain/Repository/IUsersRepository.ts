/* eslint-disable no-unused-vars */ import User from '@modules/users/infra/typeorm/entities/user';
import IBaseRepository from '@shared/domain/repository/IBaseRepository';

export default interface IUsersRepository extends IBaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}
