import { ICreateUser } from './ICreateUsers';

export interface IUpdateUser extends ICreateUser {
  id: string;
}
