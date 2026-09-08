import { API_BASE_URL } from "../utils/constants";

export const getProducts = async (filters = {}) => {
	try {
		const params = new URLSearchParams();
		if (filters.category && filters.category !== "All")
			params.append("category", filters.category);
		if (filters.search) params.append("search", filters.search);
		if (filters.sort) params.append("sort", filters.sort);

		const queryString = params.toString() ? `?${params.toString()}` : "";
		const response = await fetch(`${API_BASE_URL}/products${queryString}`);

		if (!response.ok) {
			throw new Error(
				`Failed to fetch products (Status: ${response.status})`,
			);
		}

		const json = await response.json();
		return json.data || [];
	} catch (error) {
		console.error("[productService.getProducts] Error:", error);
		throw error;
	}
};

export const getProductById = async (id) => {
	try {
		const response = await fetch(`${API_BASE_URL}/products/${id}`);
		if (!response.ok) {
			throw new Error(`Failed to fetch product ${id}`);
		}
		const json = await response.json();
		return json.data;
	} catch (error) {
		console.error(`[productService.getProductById] Error for ${id}:`, error);
		throw error;
	}
};

export const getCategories = async () => {
	try {
		const response = await fetch(`${API_BASE_URL}/products/categories`);
		if (!response.ok) {
			throw new Error("Failed to fetch categories");
		}
		const json = await response.json();
		return json.data || [];
	} catch (error) {
		console.error("[productService.getCategories] Error:", error);
		throw error;
	}
};
