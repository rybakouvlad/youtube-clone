import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
const auth = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1]; // "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({ message: 'Нет авторизации' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    console.log('linkkkk');
    console.log(req.currentUser._id);
    req.currentUser._id = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Нет авторизации' });
  }
};

export default auth;
