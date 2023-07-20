/* eslint-disable no-unused-vars */
import ICreateUnit from '../ICreateUnit';
import { IUnit } from '../IUnit';
import IUpdateUnit from '../IUpdateUnit';

export default interface IUnitRepository {
  save(unit: ICreateUnit): Promise<void>;
  update(unitUpdate: IUpdateUnit): Promise<void>;
  getById(id: string): Promise<IUnit | null>;
  getAll(): Promise<IUnit[]>;
  delete(id: string): Promise<void>;
}
