import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
} from "react";
import { getProducts } from "../services/productService";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [cart, setCart] = useState(() => {
		try {
			const savedCart = localStorage.getItem("vibelane_cart");
			return savedCart ? JSON.parse(savedCart) : [];
		} catch (e) {
			console.error("Failed to load cart from localStorage", e);
			return [];
		}
	});

	useEffect(() => {
		try {
			localStorage.setItem("vibelane_cart", JSON.stringify(cart));
		} catch (e) {
			console.error("Failed to save cart to localStorage", e);
		}
	}, [cart]);

	const [user, setUser] = useState(null);

	// Global cached product state
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [hasLoaded, setHasLoaded] = useState(false);

	const fetchProducts = useCallback(
		async (force = false) => {
			// If already loaded and not forced to refresh, reuse memory cache
			if (!force && hasLoaded && products.length > 0) {
				return;
			}

			setLoading(true);
			setError(null);
			try {
				const data = await getProducts();
				setProducts(data);
				setHasLoaded(true);
			} catch (err) {
				setError(err.message || "Failed to load products");
			} finally {
				setLoading(false);
			}
		},
		[hasLoaded, products.length],
	);

	const addToCart = (product, quantity = 1, size = null) => {
		setCart((prevCart) => {
			const cartItemId = size ? `${product.id}-${size}` : `${product.id}`;

			const existingIndex = prevCart.findIndex(
				(item) => item.cartItemId === cartItemId,
			);

			if (existingIndex > -1) {
				const updatedCart = [...prevCart];
				updatedCart[existingIndex].quantity += quantity;
				return updatedCart;
			} else {
				return [
					...prevCart,
					{
						cartItemId,
						id: product.id,
						name: product.name,
						slug: product.slug,
						price: product.price,
						primaryImage: product.primaryImage,
						size: size || null,
						quantity,
					},
				];
			}
		});
	};

	const removeFromCart = (cartItemId) => {
		setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
	};

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	return (
		<AppContext.Provider
			value={{
				cart,
				setCart,
				user,
				setUser,
				products,
				loading,
				error,
				refetchProducts: () => fetchProducts(true),
				addToCart,
				removeFromCart,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useApp = () => useContext(AppContext);
