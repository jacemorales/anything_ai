import express from 'express';
import cors from 'cors';

console.log('[App] Starting...');

console.log('[App] Importing auth routes...');
import authRoutes from './modules/auth/auth.routes';
console.log('[App] Imported auth routes.');

console.log('[App] Importing AI routes...');
import aiRoutes from './modules/ai/ai.routes';
console.log('[App] Imported AI routes.');

console.log('[App] Importing subscription routes...');
import subscriptionRoutes from './modules/subscription/subscription.routes';
console.log('[App] Imported subscription routes.');

console.log('[App] Importing admin routes...');
import adminRoutes from './modules/admin/admin.routes';
console.log('[App] Imported admin routes.');

const app = express();
console.log('[App] Express app created.');

// Middleware
console.log('[App] Applying CORS middleware...');
app.use(cors());
console.log('[App] Applied CORS middleware.');

console.log('[App] Applying JSON middleware...');
app.use(express.json());
console.log('[App] Applied JSON middleware.');


// Routes
console.log('[App] Applying auth routes...');
app.use('/api/auth', authRoutes);
console.log('[App] Applied auth routes.');

console.log('[App] Applying AI routes...');
app.use('/api/ai', aiRoutes);
console.log('[App] Applied AI routes.');

console.log('[App] Applying subscription routes...');
app.use('/api/subscription', subscriptionRoutes);
console.log('[App] Applied subscription routes.');

console.log('[App] Applying admin routes...');
app.use('/api/admin', adminRoutes);
console.log('[App] Applied admin routes.');


// Simple test route
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});
console.log('[App] Test route created.');

console.log('[App] Exporting app...');
export default app;
console.log('[App] App exported.');