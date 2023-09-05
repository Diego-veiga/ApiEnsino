import IUser from '@modules/users/domain/IUser';
import { IUserSubject } from '@modules/userSubjects/domain/IUserSubjects';
import UserSubjects from '@modules/userSubjects/infra/typeorm/entities/userSubject';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export default class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  email: string;
  @Column()
  password: string;
  @Column('boolean')
  active: boolean;

  @OneToMany(() => UserSubjects, userSubjects => userSubjects.user)
  userSubjects?: IUserSubject[];

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
