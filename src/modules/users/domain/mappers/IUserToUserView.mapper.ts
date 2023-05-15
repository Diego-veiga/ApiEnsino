import IUser from '../IUser';
import IUserView from '../UserView';

export default interface IUserToUserViewMapper {
  mapperUserToUserView(model: IUser): IUserView;
}
