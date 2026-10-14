import { useState, useMemo } from "react";
import { useApp } from "../context/AppContext";

export const useProducts = (initialFilters = {}) => {
	const { products: allProducts, loading, error, refetchProducts } = useApp();
	const [filters, setFilters] = useState(initialFilters);

	// In-memory filter on the cached dataset
	const products = useMemo(() => {
		if (!allProducts || allProducts.length === 0) return [];
		let list = [...allProducts];

		if (filters.category && filters.category !== "All") {
			list = list.filter(
				(p) => p.category?.toLowerCase() === filters.category.toLowerCase()
			);
		}

		if (filters.search) {
			const q = filters.search.toLowerCase();
			list = list.filter(
				(p) =>
					p.name?.toLowerCase().includes(q) ||
					p.description?.toLowerCase().includes(q)
			);
		}

		if (filters.sort === "price-low") {
			list.sort((a, b) => a.price - b.price);
		} else if (filters.sort === "price-high") {
			list.sort((a, b) => b.price - a.price);
		}

		return list;
	}, [allProducts, filters]);

	return {
		products,
		allProducts,
		loading,
		error,
		filters,
		setFilters,
		refetch: refetchProducts,
	};
};

export default useProducts;
