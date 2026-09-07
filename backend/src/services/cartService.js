import { mockProducts } from '../models/mockData.js';
import { AppError } from '../utils/appError.js';

// In-memory cart store (keyed by sessionId or userId)
const carts = new Map();

class CartService {
  getCart(sessionId = 'guest-session') {
    if (!carts.has(sessionId)) {
      carts.set(sessionId, { items: [], subtotal: 0, totalItems: 0 });
    }
    return carts.get(sessionId);
  }

  addToCart(sessionId = 'guest-session', { productId, quantity = 1, size = 'M' }) {
    const product = mockProducts.find((p) => p.id === productId);
    if (!product) {
      throw new AppError('Product not found to add to cart', 404);
    }

    const cart = this.getCart(sessionId);
    const existingIndex = cart.items.findIndex(
      (item) => item.productId === productId && item.size === size
    );

    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += quantity;
    } else {
      cart.items.push({
        id: `${productId}_${size}_${Date.now()}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        size,
        quantity,
      });
    }

    this._recalculate(cart);
    return cart;
  }

  updateQuantity(sessionId = 'guest-session', itemId, quantity) {
    const cart = this.getCart(sessionId);
    const item = cart.items.find((i) => i.id === itemId);

    if (!item) {
      throw new AppError('Cart item not found', 404);
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter((i) => i.id !== itemId);
    } else {
      item.quantity = quantity;
    }

    this._recalculate(cart);
    return cart;
  }

  removeFromCart(sessionId = 'guest-session', itemId) {
    const cart = this.getCart(sessionId);
    cart.items = cart.items.filter((i) => i.id !== itemId);
    this._recalculate(cart);
    return cart;
  }

  clearCart(sessionId = 'guest-session') {
    const cart = { items: [], subtotal: 0, totalItems: 0 };
    carts.set(sessionId, cart);
    return cart;
  }

  _recalculate(cart) {
    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.subtotal = parseFloat(
      cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
    );
  }
}

export const cartService = new CartService();
