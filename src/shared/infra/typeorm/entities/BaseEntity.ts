import IBaseDomain from '@shared/domain/IBaseDomain';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export default class BaseEntity implements IBaseDomain {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'bool', default: true })
  active: boolean;
  @CreateDateColumn()
  create_at: Date;
  @UpdateDateColumn()
  update_at: Date;
}
