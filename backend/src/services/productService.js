import { mockProducts, mockCategories } from '../models/mockData.js';
import { AppError } from '../utils/appError.js';

class ProductService {
  async getAllProducts({ category, search, sort, minPrice, maxPrice }) {
    let results = [...mockProducts];

    // Filter by Category
    if (category && category.toLowerCase() !== 'all') {
      results = results.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by Search Query
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Filter by Price range
    if (minPrice) {
      results = results.filter((p) => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      results = results.filter((p) => p.price <= parseFloat(maxPrice));
    }

    // Sorting
    if (sort === 'price-low') {
      results.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      results.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      results.sort((a, b) => b.rating - a.rating);
    }

    return results;
  }

  async getProductById(id) {
    const product = mockProducts.find((p) => p.id === id || p.slug === id);
    if (!product) {
      throw new AppError(`Product not found with identifier: ${id}`, 404);
    }
    return product;
  }

  async getCategories() {
    return mockCategories;
  }
}

export const productService = new ProductService();
