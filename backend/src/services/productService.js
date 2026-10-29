import { supabase } from "../config/db.js";
import { mockProducts, mockCategories } from "../models/mockData.js";
import { AppError } from "../utils/appError.js";
import { cacheService } from "./cacheService.js";
import { CACHE_KEYS, CACHE_TTL } from "../constants/cache.js";

// Helper to map Supabase database snake_case columns to camelCase expected by the frontend
const formatProduct = (p) => {
	if (!p) return null;
	return {
		_id: p.id,
		id: p.id,
		itemNumber: p.item_number,
		name: p.name,
		slug: p.slug,
		category: p.category,
		price: Number(p.price),
		badge: p.badge || "",
		primaryImage: p.primary_image,
		hoverImage: p.hover_image,
		description: p.description || "",
		inStock: p.in_stock,
		stockQuantity: p.stock_quantity,
		sizes: p.sizes ?? null,
		createdAt: p.created_at,
		updatedAt: p.updated_at,
	};
};

class ProductService {
	async getAllProducts({ category, search, sort, minPrice, maxPrice }) {
		const cacheKey = CACHE_KEYS.PRODUCTS_QUERY({
			category,
			search,
			sort,
			minPrice,
			maxPrice,
		});

		// Check Redis Cache
		const cachedProducts = await cacheService.get(cacheKey);
		if (cachedProducts) {
			return cachedProducts;
		}

		if (supabase) {
			try {
				let query = supabase.from("products").select("*");

				// Category filter
				if (category && category.toLowerCase() !== "all") {
					query = query.ilike("category", category);
				}

				// Search filter (name or description)
				if (search) {
					query = query.or(
						`name.ilike.%${search}%,description.ilike.%${search}%`,
					);
				}

				// Price range filters
				if (minPrice) {
					query = query.gte("price", parseFloat(minPrice));
				}
				if (maxPrice) {
					query = query.lte("price", parseFloat(maxPrice));
				}

				// Sorting
				if (sort === "price-low") {
					query = query.order("price", { ascending: true });
				} else if (sort === "price-high") {
					query = query.order("price", { ascending: false });
				} else {
					query = query.order("id", { ascending: true });
				}

				const { data, error } = await query;

				if (!error && data && data.length > 0) {
					const formatted = data.map(formatProduct);
					// Cache the query result in Redis
					await cacheService.set(cacheKey, formatted, CACHE_TTL.MEDIUM);
					return formatted;
				}

				if (error) {
					console.warn(
						"[productService.getAllProducts] Supabase error, falling back to mock:",
						error.message,
					);
				}
			} catch (err) {
				console.warn(
					"[productService.getAllProducts] Supabase request failed, falling back to mock:",
					err.message,
				);
			}
		}

		// Fallback to in-memory mock store if DB is not configured or query fails
		let results = [...mockProducts];
		if (category && category.toLowerCase() !== "all") {
			results = results.filter(
				(p) => p.category.toLowerCase() === category.toLowerCase(),
			);
		}
		if (search) {
			const q = search.toLowerCase();
			results = results.filter(
				(p) =>
					p.name.toLowerCase().includes(q) ||
					p.description.toLowerCase().includes(q),
			);
		}
		if (minPrice)
			results = results.filter((p) => p.price >= parseFloat(minPrice));
		if (maxPrice)
			results = results.filter((p) => p.price <= parseFloat(maxPrice));
		if (sort === "price-low") results.sort((a, b) => a.price - b.price);
		if (sort === "price-high") results.sort((a, b) => b.price - a.price);

		// Cache mock fallback results as well
		await cacheService.set(cacheKey, results, CACHE_TTL.MEDIUM);
		return results;
	}

	async getProductById(id) {
		const isNumeric = !isNaN(Number(id));
		const cacheKey = isNumeric
			? CACHE_KEYS.PRODUCT_BY_ID(id)
			: CACHE_KEYS.PRODUCT_BY_SLUG(id);

		//  Check Redis Cache
		const cachedProduct = await cacheService.get(cacheKey);
		if (cachedProduct) {
			return cachedProduct;
		}

		let productResult = null;

		if (supabase) {
			try {
				let query = supabase.from("products").select("*");

				// Check if numeric ID, otherwise query by slug or item_number
				if (isNumeric) {
					query = query.or(
						`id.eq.${id},item_number.eq.${id},slug.eq.${id}`,
					);
				} else {
					query = query.or(`slug.eq.${id},item_number.eq.${id}`);
				}

				const { data, error } = await query.limit(1).maybeSingle();

				if (!error && data) {
					productResult = formatProduct(data);
				}
			} catch (err) {
				console.warn(
					`[productService.getProductById] Supabase lookup error for ${id}:`,
					err.message,
				);
			}
		}

		if (!productResult) {
			const product = mockProducts.find(
				(p) => p.id == id || p.slug === id || p.itemNumber === id,
			);
			if (!product) {
				throw new AppError(`Product not found with identifier: ${id}`, 404);
			}
			productResult = product;
		}

		//  Cache in Redis under both ID and Slug (if available) for 1 hour
		await cacheService.set(cacheKey, productResult, CACHE_TTL.VERY_LONG);
		if (
			productResult.slug &&
			cacheKey !== CACHE_KEYS.PRODUCT_BY_SLUG(productResult.slug)
		) {
			await cacheService.set(
				CACHE_KEYS.PRODUCT_BY_SLUG(productResult.slug),
				productResult,
				CACHE_TTL.VERY_LONG,
			);
		}

		return productResult;
	}

	async getCategories() {
		const cacheKey = CACHE_KEYS.ALL_CATEGORIES;

		// Check Redis
		const cachedCategories = await cacheService.get(cacheKey);
		if (cachedCategories) {
			return cachedCategories;
		}

		let categories = mockCategories;

		if (supabase) {
			try {
				const { data, error } = await supabase
					.from("products")
					.select("category");
				if (!error && data && data.length > 0) {
					const uniqueCategories = Array.from(
						new Set(data.map((item) => item.category)),
					);
					categories = ["All", ...uniqueCategories];
				}
			} catch (err) {
				console.warn(
					"[productService.getCategories] Supabase categories error:",
					err.message,
				);
			}
		}

		//  Cache categories for 15 minutes
		await cacheService.set(cacheKey, categories, CACHE_TTL.LONG);
		return categories;
	}
}

export const productService = new ProductService();
