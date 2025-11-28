import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Product from './pages/Product';
import Contact from './pages/Contact';
import About from './pages/About';
import OrderPage from './pages/OrderPage';
import ProductDetails from './pages/ProductDetails';
import { CartProvider } from './context/cartContext';
import api from './service/api';
import Cart from './pages/Cart';
import UserOrders from './pages/Order';

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : ''
  );
  const [pid, setPid] = useState('');

  const fetchUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const response = await api.get('/auth/me');
    
    return response.data.user;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return null;
  }
};

  useEffect(() => {
    const initializeUser = async () => {
      const userData = await fetchUser();
      setUser(userData)
    }
    initializeUser()
  }, [])

  return (
    <CartProvider>
      <Layout setToken={setToken} user={user} token={token} pid={pid}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route
            path='/login'
            element={token ? <Navigate to='/' /> : <Login setUser={setUser} />}
          />
          <Route
            path='/register'
            element={token ? <Navigate to='/' /> : <Register />}
          />
          <Route path='/product' element={<Product />} />
          <Route
            path='/product/:id'
            element={<ProductDetails setPid={setPid} />}
          />
          <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/place-order' element={<OrderPage user={user} />} />
          <Route path='/user-order' element={user ? <UserOrders /> : <Navigate to='/' />} />
        </Routes>
      </Layout>
    </CartProvider>
  );
};

export default App;
