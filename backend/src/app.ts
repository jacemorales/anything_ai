import express from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/auth.routes';
import aiRoutes from './modules/ai/ai.routes';
import subscriptionRoutes from './modules/subscription/subscription.routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/subscription', subscriptionRoutes);

// Simple test route
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

export default app;