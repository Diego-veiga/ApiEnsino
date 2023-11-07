import ILesson from '@modules/lesson/domain/ILesson';
import Unit from '@modules/unit/infra/typeorm/entities/Unit';
import BaseEntity from '@shared/infra/typeorm/entities/BaseEntity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('lesson')
export default class Lesson extends BaseEntity implements ILesson {
  @Column()
  numberQuestions: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  progress: number;
  @Column({ type: 'text', default: '' })
  description: string;
  @Column()
  unitId: string;
  @ManyToOne(() => Unit, unit => unit.lessons)
  unit: Unit;
}
