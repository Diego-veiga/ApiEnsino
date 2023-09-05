import ISubject from '@modules/subjects/domain/ISubject';
import Subject from '@modules/subjects/infra/typeorm/entities/subject';
import IUser from '@modules/users/domain/IUser';
import User from '@modules/users/infra/typeorm/entities/user';
import { IUserSubject } from '@modules/userSubjects/domain/IUserSubjects';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('userSubjects')
export default class UserSubjects implements IUserSubject {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  userId: string;
  @Column()
  subjectId: string;
  @Column({ type: 'decimal', default: 0.0 })
  grade: number;
  @Column({ type: 'bool', default: true })
  active: boolean;
  @ManyToOne(() => User, user => user.userSubjects)
  user: IUser;
  @ManyToOne(() => Subject, subject => subject.userSubjects)
  subject: ISubject;
  @CreateDateColumn()
  create_at: Date;
  @UpdateDateColumn()
  update_at: Date;
}
