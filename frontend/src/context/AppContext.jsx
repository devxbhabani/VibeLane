import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getProducts } from '../services/productService';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // Global cached product state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchProducts = useCallback(async (force = false) => {
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
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [hasLoaded, products.length]);

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
