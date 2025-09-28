import { Response } from 'express';
import { AIService } from './ai.service';

// Custom Request type to include the user property from our authGuard
interface AuthRequest extends Request {
  user?: { id: number };
}

export const AIController = {
  async generate(req: AuthRequest, res: Response) {
    try {
      const { prompt } = req.body;
      const userId = req.user?.id;

      if (!prompt || !userId) {
        return res.status(400).json({ message: 'User ID and prompt are required' });
      }

      const reply = await AIService.generateResponse(userId, prompt);
      res.status(200).json({ reply });

    } catch (error: any) {
      if (error.message.includes('quota exceeded')) {
        return res.status(429).json({ message: error.message });
      }
      res.status(500).json({ message: 'Server error during AI response generation' });
    }
  },
};