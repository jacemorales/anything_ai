import { Response } from 'express';
import prisma from '../../config/db';
import { AuthRequest } from '../../types/auth';

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

  async getUsers(req: AuthRequest, res: Response) {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users.' });
    }
  },
};