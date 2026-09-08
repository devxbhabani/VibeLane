import { productService } from '../services/productService.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

export const getProducts = asyncHandler(async (req, res) => {
  const { category, search, sort, minPrice, maxPrice } = req.query;
  const products = await productService.getAllProducts({
    category,
    search,
    sort,
    minPrice,
    maxPrice,
  });

  return ApiResponse.success(res, 'Products fetched successfully', products);
});

export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await productService.getProductById(id);

  return ApiResponse.success(res, 'Product retrieved successfully', product);
});

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await productService.getCategories();
  return ApiResponse.success(res, 'Categories fetched successfully', categories);
});
