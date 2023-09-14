import Unit from '@modules/unit/infra/typeorm/entities/Unit';

export default interface ILesson {
  id: string;
  description: string;
  numberQuestions: number;
  progress: number;
  unitId: string;
  unit: Unit;
  create_at: Date;
  update_at: Date;
}
