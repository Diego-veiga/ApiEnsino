import Unit from '@modules/Unit/infra/typeorm/entities/Unit';

export default interface ILesson {
  description: string;
  numberQuestions: number;
  progress: number;
  unitId: string;
  unit: Unit;
}
