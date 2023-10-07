import Subject from '@modules/subjects/infra/typeorm/entities/subject';
import User from '@modules/users/infra/typeorm/entities/user';
import { IUserSubject } from '@modules/userSubjects/domain/IUserSubjects';
import BaseEntity from '@shared/infra/typeorm/entities/BaseEntity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('userSubjects')
export default class UserSubjects extends BaseEntity implements IUserSubject {
  @Column()
  userId: string;
  @Column()
  subjectId: string;
  @Column({ type: 'decimal', default: 0.0 })
  grade: number;
  @ManyToOne(() => User, user => user.userSubjects)
  user: User;
  @ManyToOne(() => Subject, subject => subject.userSubjects)
  subject: Subject;
}
