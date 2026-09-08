import express from 'express';
import { checkHealth } from '../controllers/healthController.js';
import productRoutes from './productRoutes.js';

const router = express.Router();

// Health check route
router.get('/health', checkHealth);

// Product API routes
router.use('/products', productRoutes);

export default router;
