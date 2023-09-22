import ILesson from '@modules/lesson/domain/ILesson';
import Unit from '@modules/unit/infra/typeorm/entities/Unit';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('lesson')
export default class Lesson implements ILesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  numberQuestions: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  progress: number;
  @Column({ type: 'text', default: '' })
  description: string;
  @Column({ default: true })
  active: boolean;
  @Column()
  unitId: string;
  @ManyToOne(() => Unit, unit => unit.lessons)
  unit: Unit;
  @CreateDateColumn()
  create_at: Date;
  @UpdateDateColumn()
  update_at: Date;
}
