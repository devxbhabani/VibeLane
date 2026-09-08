import mongoose from 'mongoose';
import { Product } from '../models/Product.js';
import { mockProducts } from '../models/mockData.js';

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      console.log('[DB] No MONGO_URI provided in environment. Running with in-memory fallback.');
      return;
    }

    console.log('[DB] Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri);
    console.log('[DB] MongoDB Connected Successfully!');

    // Auto-seed mock products if the DB collection is currently empty
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log('[DB] Product collection is empty. Seeding initial products...');
      await Product.insertMany(mockProducts);
      console.log(`[DB] Successfully seeded ${mockProducts.length} products to MongoDB!`);
    } else {
      console.log(`[DB] Database currently contains ${count} products.`);
    }
  } catch (error) {
    console.error(`[DB Error]: ${error.message}`);
    // Don't crash server if network to cloud DB is temporarily interrupted
  }
};
