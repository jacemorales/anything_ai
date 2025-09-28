import { Router } from 'express';
import { AIController } from './ai.controller';
import { authGuard } from '../../middleware/authGuard';

const router = Router();

router.post('/generate', authGuard, AIController.generate);

export default router;