/* eslint-disable no-unused-vars */
import IUser from '../IUser';
import IUserView from '../View/UserView';

export default interface IUserToUserViewMapper {
  mapperUserToUserView(model: IUser): IUserView;
}
