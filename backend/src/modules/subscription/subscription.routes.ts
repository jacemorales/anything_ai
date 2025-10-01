import { Router } from 'express';
import { SubscriptionController } from './subscription.controller';
import { authGuard } from '../../middleware/authGuard';

const router = Router();

router.get('/', authGuard, SubscriptionController.getSubscription);
router.put('/', authGuard, SubscriptionController.updateSubscription);

export default router;