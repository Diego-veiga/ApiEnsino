import { area } from '@modules/subjects/domain/enum/area';
import ISubject from '@modules/subjects/domain/ISubject';
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

@Entity('subject')
export default class Subject implements ISubject {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({ type: 'enum', enum: area, default: area.exact })
  area: area;
  @Column()
  active: boolean;
  @OneToMany(() => UserSubjects, userSubjects => userSubjects.subject)
  userSubjects?: IUserSubject[];
  @CreateDateColumn()
  create_at: Date;
  @UpdateDateColumn()
  update_at: Date;
}
