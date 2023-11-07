import IUser from '@modules/users/domain/IUser';
import { IUserSubject } from '@modules/userSubjects/domain/IUserSubjects';
import UserSubjects from '@modules/userSubjects/infra/typeorm/entities/userSubject';
import BaseEntity from '@shared/infra/typeorm/entities/BaseEntity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('users')
export default class User extends BaseEntity implements IUser {
  @Column()
  name: string;
  @Column()
  lastName: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @OneToMany(() => UserSubjects, userSubjects => userSubjects.user)
  userSubjects?: IUserSubject[];
}
