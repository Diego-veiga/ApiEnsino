import { area } from '@modules/subjects/domain/enum/area';
import ISubject from '@modules/subjects/domain/ISubject';
import { IUserSubject } from '@modules/userSubjects/domain/IUserSubjects';
import UserSubjects from '@modules/userSubjects/infra/typeorm/entities/userSubject';
import BaseEntity from '@shared/infra/typeorm/entities/BaseEntity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('subject')
export default class Subject extends BaseEntity implements ISubject {
  @Column()
  name: string;
  @Column({ type: 'enum', enum: area, default: area.exact })
  area: area;

  @OneToMany(() => UserSubjects, userSubjects => userSubjects.subject)
  userSubjects?: IUserSubject[];
}
