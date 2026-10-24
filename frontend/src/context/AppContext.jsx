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
	const getCartKey = (currentUser) => {
		return currentUser
			? `vibelane_cart_${currentUser.id}`
			: "vibelane_cart_guest";
	};

	const [token, setToken] = useState(
		() => localStorage.getItem("vibelane_token") || null,
	);
	const [user, setUser] = useState(() => {
		try {
			const saved = localStorage.getItem("vibelane_user");
			return saved ? JSON.parse(saved) : null;
		} catch (e) {
			console.error();
		}
	});

	const [splashFinished, setSplashFinished] = useState(false);

	const [cart, setCart] = useState(() => {
		try {
			const savedUser = localStorage.getItem("vibelane_user");
			const persedUser = savedUser ? JSON.parse(savedUser) : null;
			const key = getCartKey(persedUser);
			const savedCart = localStorage.getItem(key);
			return savedCart ? JSON.parse(savedCart) : [];
		} catch (e) {
			console.error("Failed to load cart from localStorage", e);
			return [];
		}
	});

	useEffect(() => {
		try {
			const key = getCartKey(user);
			localStorage.setItem(key, JSON.stringify(cart));
		} catch (e) {
			console.error("Failed to save cart", e);
		}
	}, [cart, user]);

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

	const clearCart = () => {
		setCart([]);
		try {
			localStorage.removeItem("vibelane_cart");
		} catch (e) {
			console.error("Failed to clear cart in localStorage", e);
		}
	};

	const handleLoginSuccess = (userData, userToken) => {
		setUser(userData);
		setToken(userToken);
		localStorage.setItem("vibelane_user", JSON.stringify(userData));
		localStorage.setItem("vibelane_token", userToken);

		const userCartKey = `vibelane_cart_${userData.id}`;
		const userCart = localStorage.getItem(userCartKey);
		setCart(userCart ? JSON.perse(userCart) : []);
	};

	const handleLogout = () => {
		setUser(null);
		setToken(null);
		localStorage.removeItem("vibelane_user");
		localStorage.removeItem("vibelane_token");

		const guestCartKey = `vibelane_cart_guest`;
		const guestCart = localStorage.getItem(guestCartKey);
		setCart(guestCart ? JSON.perse(guestCart) : []);
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
				clearCart,
				token,
				handleLoginSuccess,
				handleLogout,
				splashFinished,
				setSplashFinished,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useApp = () => useContext(AppContext);
