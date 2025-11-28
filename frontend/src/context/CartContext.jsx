import { createContext, useContext, useEffect, useState } from 'react';
import api from '../service/api';

const cartContext = createContext(undefined);

export const useCart = () => {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error('useCart must use within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState({});
  const [product, setProduct] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await api.get('/product');
        if (response.data.success) {
          setProduct(response.data.products);
        }
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };
    loadProducts();
  }, []);

  const loadCartFromLocalStorage = () => {
    try {
      const savedCart = localStorage.getItem('cartData');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartData(parsedCart);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  };

  const loadCartFromDatabase = async () => {
    try {
      const response = await api.get('/product/cart');
      if (response.data.success) {
        setCartData(response.data.cartItem || {});
      }
    } catch (error) {
      console.error('Error loading cart from database:', error);
      loadCartFromLocalStorage();
    } 
  };
  useEffect(() => {
    if (isAuthenticated) {
      loadCartFromDatabase();
    } else {
      loadCartFromLocalStorage();
    }
  }, [isAuthenticated]);

  const syncCartWithDatabase = async () => {
    try {
      const localCart = JSON.parse(localStorage.getItem('cartData') || '{}');
      if (Object.keys(localCart).length > 0) {
        const response = await api.post('/product/cart/sync', { localCartItem: localCart });
        if (response.data.success) {
          localStorage.removeItem('cartData');
          setCartData(response.data.cartItem);
        }
      }
    } catch (error) {
      console.error('Error syncing cart:', error);
    }
  };

    const addToCart = async (productId, color) => {
    if (!productId || !color) {
      alert('Please select a color');
      return;
    }

    const cartKey = `${productId}_${color}`;

    if (isAuthenticated) {
      try {
        const response = await api.post('/product/cart/add', { productId, color, quantity: 1 });
        if (response.data.success) {
          setCartData(response.data.cartItem);
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Failed to add item to cart',error.message);
      }
    } else {
      const newCartData = { ...cartData };
      if (newCartData[cartKey]) {
        newCartData[cartKey] += 1;
      } else {
        newCartData[cartKey] = 1;
      }
      setCartData(newCartData);
      localStorage.setItem('cartData', JSON.stringify(newCartData));
    }
  };

  const updateQuantity = async (productId, color, quantity) => {
    const cartKey = `${productId}_${color}`;

    if (isAuthenticated) {
      try {
        const response = await api.post('/product/cart/update', { productId, color, quantity });
        if (response.data.success) {
          setCartData(response.data.cartItem);
        }
      } catch (error) {
        console.error('Error updating cart:', error);
      }
    } else {
      const newCartData = { ...cartData };
      if (quantity <= 0) {
        delete newCartData[cartKey];
      } else {
        newCartData[cartKey] = quantity;
      }
      setCartData(newCartData);
      localStorage.setItem('cartData', JSON.stringify(newCartData));
    }
  };

  const removeFromCart = async (productId, color) => {
    if (isAuthenticated) {
      try {
        const response = await api.post('/product/cart/remove', { productId, color });
        if (response.data.success) {
          setCartData(response.data.cartItem);
        }
      } catch (error) {
        console.error('Error removing from cart:', error);
      }
    } else {
      const cartKey = `${productId}_${color}`;
      const newCartData = { ...cartData };
      delete newCartData[cartKey];
      setCartData(newCartData);
      localStorage.setItem('cartData', JSON.stringify(newCartData));
    }
  };

  const clearCart = async () => {
    if (isAuthenticated) {
      try {
        const response = await api.post('/product/cart/clear');
        if (response.data.success) {
          setCartData({});
        }
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    } else {
      setCartData({});
      localStorage.removeItem('cartData');
    }
  };

  const getTotalItems = () => {
    return Object.values(cartData).reduce((total, quantity) => total + quantity, 0);
  };

  const getTotalPrice = () => {
    let total = 0;
    Object.keys(cartData).forEach((cartKey) => {
      const [productId] = cartKey.split('_');
      const foundProduct = product.find((p) => p._id === productId);
      if (foundProduct) {
        total += foundProduct.price * cartData[cartKey];
      }
    });
    return total;
  };

  const getCartItems = () => {
    const items = [];
    Object.keys(cartData).forEach((cartKey) => {
      const [productId, color] = cartKey.split('_');
      const foundProduct = product.find((p) => p._id === productId);
      if (foundProduct) {
        items.push({
          ...foundProduct,
          color,
          quantity: cartData[cartKey],
          cartKey,
        });
      }
    });
    return items;
  };

  const setAuthStatus = (status) => {
    setIsAuthenticated(status);
    if (status) {
      syncCartWithDatabase();
    }
  };

  const value = {
    cartData,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getCartItems,
    setAuthStatus,
    product,
  };

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};
