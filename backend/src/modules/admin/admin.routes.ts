import { Router } from 'express';
import { AdminController } from './admin.controller';
import { authGuard } from '../../middleware/authGuard';
import { adminGuard } from '../../middleware/adminGuard';

const router = Router();

// Protect all admin routes with both auth and admin guards
router.use(authGuard, adminGuard);

router.get('/stats', AdminController.getStats);

export default router;