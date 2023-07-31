import { IUnit } from '@modules/unit/domain/IUnit';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('unit')
export default class Unit implements IUnit {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column()
  explanation: string;

  @Column({ type: 'bool', default: true })
  active: boolean;
  @CreateDateColumn()
  create_at: Date;
  @UpdateDateColumn()
  update_at: Date;
}
