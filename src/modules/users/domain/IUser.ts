export default interface IUser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  active: boolean;
  password: string;
  create_at: Date;
  update_at: Date;
}
