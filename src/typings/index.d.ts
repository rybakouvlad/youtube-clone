import { IUser } from '../MongoDB/models/Users';
declare global {
  namespace Express {
    interface Request {
      currentUser: IUser;
    }
  }
}
