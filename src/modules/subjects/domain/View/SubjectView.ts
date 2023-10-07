import { area } from '../enum/area';

export default class SubjectView {
  id: string;
  name: string;
  area: area;
  creationDate?: Date;
  updateDate?: Date;
}
