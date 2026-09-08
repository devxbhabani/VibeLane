import { useState, useEffect, useCallback } from "react";
import { getProducts } from "../services/productService";

export const useProducts = (initialFilters = {}) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [filters, setFilters] = useState(initialFilters);

	const loadProducts = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const data = await getProducts(filters);
			setProducts(data);
		} catch (err) {
			setError(err.message || "Failed to load products");
		} finally {
			setLoading(false);
		}
	}, [filters]);

	useEffect(() => {
		loadProducts();
	}, [loadProducts]);

	return {
		products,
		loading,
		error,
		filters,
		setFilters,
		refetch: loadProducts,
	};
};

export default useProducts;
