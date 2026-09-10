import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Global Middlewares
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Serve static product images fallback
app.use('/images', express.static(path.resolve(__dirname, '../../frontend/public/images')));

// API Routes
app.use(process.env.API_PREFIX || '/api/v1', routes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to VibeLane E-Commerce API' });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;
