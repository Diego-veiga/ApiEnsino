/* eslint-disable no-unused-vars */
export default interface IBaseRepository<T> {
  create(obj: T): Promise<T>;
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T | null>;
  delete(id: string): Promise<void>;
  update(obj: T): Promise<T>;
}
