import { area } from './enum/area';

export default interface ISubject {
  id: string;
  name: string;
  area: area;
  active: boolean;
  create_at: Date;
  update_at: Date;
}
