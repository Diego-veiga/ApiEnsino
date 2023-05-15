import { area } from '@modules/subjects/domain/enum/area';
import ISubject from '@modules/subjects/domain/ISubject';
import {
  Column,
  CreateDateColumn,
  Entity,
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
  @CreateDateColumn()
  create_at: Date;
  @UpdateDateColumn()
  update_at: Date;
}
