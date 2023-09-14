import Lesson from '@modules/lesson/infra/typeorm/Entities/lesson';

export interface IUnit {
  id: string;
  title: string;
  explanation: string;
  active: boolean;
  lessons: Lesson[];
  create_at: Date;
  update_at: Date;
}
