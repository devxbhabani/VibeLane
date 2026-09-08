import mongoose from 'mongoose';
import { Product } from '../models/Product.js';
import { mockProducts, mockCategories } from '../models/mockData.js';
import { AppError } from '../utils/appError.js';

class ProductService {
  async getAllProducts({ category, search, sort, minPrice, maxPrice }) {
    // If MongoDB is connected, query MongoDB
    if (mongoose.connection.readyState === 1) {
      let query = {};

      // Category filter
      if (category && category.toLowerCase() !== 'all') {
        query.category = { $regex: new RegExp(`^${category}$`, 'i') };
      }

      // Search filter
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ];
      }

      // Price filters
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = parseFloat(minPrice);
        if (maxPrice) query.price.$lte = parseFloat(maxPrice);
      }

      let mongoQuery = Product.find(query);

      // Sorting
      if (sort === 'price-low') {
        mongoQuery = mongoQuery.sort({ price: 1 });
      } else if (sort === 'price-high') {
        mongoQuery = mongoQuery.sort({ price: -1 });
      } else {
        mongoQuery = mongoQuery.sort({ createdAt: -1 });
      }

      return await mongoQuery.lean();
    }

    // Fallback to in-memory mock store if DB is offline
    let results = [...mockProducts];
    if (category && category.toLowerCase() !== 'all') {
      results = results.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    if (minPrice) results = results.filter((p) => p.price >= parseFloat(minPrice));
    if (maxPrice) results = results.filter((p) => p.price <= parseFloat(maxPrice));
    if (sort === 'price-low') results.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') results.sort((a, b) => b.price - a.price);

    return results;
  }

  async getProductById(id) {
    if (mongoose.connection.readyState === 1) {
      let product = null;
      if (mongoose.isValidObjectId(id)) {
        product = await Product.findById(id).lean();
      }
      if (!product) {
        product = await Product.findOne({
          $or: [{ slug: id }, { itemNumber: id }],
        }).lean();
      }
      if (!product) {
        throw new AppError(`Product not found with identifier: ${id}`, 404);
      }
      return product;
    }

    const product = mockProducts.find((p) => p.id === id || p.slug === id);
    if (!product) {
      throw new AppError(`Product not found with identifier: ${id}`, 404);
    }
    return product;
  }

  async getCategories() {
    if (mongoose.connection.readyState === 1) {
      const distinctCategories = await Product.distinct('category');
      return ['All', ...distinctCategories];
    }
    return mockCategories;
  }
}

export const productService = new ProductService();
