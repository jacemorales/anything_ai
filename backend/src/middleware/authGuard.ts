import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AuthRequest } from '../types/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

export const authGuard = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === 'object' && 'id' in decoded && 'email' in decoded) {
      req.user = {
        id: (decoded as JwtPayload).id,
        email: (decoded as JwtPayload).email,
        isAdmin: (decoded as JwtPayload).isAdmin,
      };
      next();
    } else {
      throw new Error('Invalid token payload.');
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};