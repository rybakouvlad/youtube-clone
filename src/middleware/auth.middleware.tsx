import jwt from 'jsonwebtoken';
import { IUser } from '../MongoDB/models/Users';
import { Request, Response, NextFunction } from 'express';

export interface DecodedData {
  data: {
    _doc: IUser;
  };
}
const auth = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Auth error' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as DecodedData;
    console.log(decoded);
    req.user = decoded.data._doc;

    next();
  } catch (e) {
    return res.status(401).json({ message: 'Auth error' });
  }
};

export default auth;
