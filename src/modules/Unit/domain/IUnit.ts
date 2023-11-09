import Lesson from '@modules/lesson/infra/typeorm/Entities/lesson';

export interface IUnit {
  title: string;
  explanation: string;
  lessons?: Lesson[];
}
