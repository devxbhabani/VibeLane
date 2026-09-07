import express from 'express';
import { checkHealth } from '../controllers/healthController.js';

const router = express.Router();

// Health check route
router.get('/health', checkHealth);

// Add feature routes here (e.g. router.use('/products', productRoutes))

export default router;
