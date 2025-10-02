import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../../types/auth';

const prisma = new PrismaClient();

export const AdminController = {
  async getStats(req: AuthRequest, res: Response) {
    try {
      const totalUsers = await prisma.user.count();
      const totalSubscriptions = await prisma.subscription.count();
      // Add more stats as needed

      res.status(200).json({
        totalUsers,
        totalSubscriptions,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching admin stats.' });
    }
  },
};