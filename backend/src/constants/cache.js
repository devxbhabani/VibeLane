export const CACHE_TTL = {
	SHORT: 60, // 1 minute (flash drop stock, quick updates)
	MEDIUM: 300, // 5 minutes (filtered searches, category listings)
	LONG: 900, // 15 minutes (unfiltered catalog, homepage drops)
	VERY_LONG: 3600, // 1 hour (static product details, specs)
};

export const CACHE_KEYS = {
	ALL_PRODUCTS: "products:all",
	ALL_CATEGORIES: "categories:all",
	HOMEPAGE_FEATURED: "homepage:featured",

	PRODUCT_BY_ID: (id) => `product:id:${id}`,
	PRODUCT_BY_SLUG: (slug) => `product:slug:${slug}`,
	PRODUCTS_BY_CATEGORY: (category) =>
		`products:category:${String(category).toLowerCase()}`,

	PRODUCTS_QUERY: (queryObj = {}) => {
		// Clean and sort keys to guarantee identical deterministic cache keys regardless of param ordering
		const sortedParams = Object.keys(queryObj)
			.filter((k) => queryObj[k] !== undefined && queryObj[k] !== "")
			.sort()
			.map((k) => `${k}=${encodeURIComponent(queryObj[k])}`)
			.join("&");

		return sortedParams ? `products:query:${sortedParams}` : "products:all";
	},

	// Patterns used for bulk clearing (e.g. redis.keys(PATTERN))
	PATTERNS: {
		PRODUCTS: "product*",
		CATEGORIES: "categories*",
		HOMEPAGE: "homepage*",
	},
};
