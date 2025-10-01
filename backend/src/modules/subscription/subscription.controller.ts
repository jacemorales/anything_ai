import { Request, Response } from 'express';
import { SubscriptionService } from './subscription.service';

// Custom Request type to include the user property from our authGuard
interface AuthRequest extends Request {
  user?: { id: number };
}

export const SubscriptionController = {
  async getSubscription(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }

      const subscription = await SubscriptionService.getSubscription(userId);
      res.status(200).json(subscription);
    } catch (error: any) {
      res.status(500).json({ message: 'Server error while fetching subscription' });
    }
  },

  async updateSubscription(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      const { plan } = req.body;

      if (!userId || !plan) {
        return res.status(400).json({ message: 'User ID and plan are required' });
      }

      const updatedSubscription = await SubscriptionService.updateSubscription(userId, plan);
      res.status(200).json(updatedSubscription);
    } catch (error: any) {
      res.status(500).json({ message: 'Server error while updating subscription' });
    }
  },
};