import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Product from './pages/Product';
import Contact from './pages/Contact';
import About from './pages/About';
import ProductDetails from './pages/ProductDetails';
import { CartProvider } from './context/cartContext';

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : ''
  );
  const [pid, setPid] = useState('');
  return (
    <CartProvider>
      <Layout setToken={setToken} token={token} pid={pid}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route
            path='/login'
            element={token ? <Navigate to='/' /> : <Login />}
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
        </Routes>
      </Layout>
    </CartProvider>
  );
};

export default App;
