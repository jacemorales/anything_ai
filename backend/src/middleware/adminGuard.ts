import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../types/auth'; // Using a shared type definition

const prisma = new PrismaClient();

export const adminGuard = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required.' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Forbidden: Admin access required.' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error while verifying admin status.' });
  }
};