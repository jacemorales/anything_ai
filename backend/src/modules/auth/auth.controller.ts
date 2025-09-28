import { Request, Response } from 'express';
import { AuthService } from './auth.service';

export const AuthController = {
  async signUp(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
      const user = await AuthService.signUp(email, password);
      res.status(201).json({ message: 'User created successfully', user });
    } catch (error: any) {
      if (error.message === 'Email already in use') {
        return res.status(409).json({ message: error.message });
      }
      res.status(500).json({ message: 'Server error during sign up' });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
      const result = await AuthService.login(email, password);
      res.status(200).json(result);
    } catch (error: any) {
      if (error.message === 'Invalid credentials') {
        return res.status(401).json({ message: error.message });
      }
      res.status(500).json({ message: 'Server error during login' });
    }
  },
};