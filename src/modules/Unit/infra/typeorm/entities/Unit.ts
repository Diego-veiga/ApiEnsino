import Lesson from '@modules/lesson/infra/typeorm/Entities/lesson';
import { IUnit } from '@modules/unit/domain/IUnit';
import BaseEntity from '@shared/infra/typeorm/entities/BaseEntity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('unit')
export default class Unit extends BaseEntity implements IUnit {
  @Column()
  title: string;
  @Column()
  explanation: string;
  @Column({ type: 'bool', default: true })
  active: boolean;
  @OneToMany(() => Lesson, lesson => lesson.unit)
  lessons?: Lesson[];
}
