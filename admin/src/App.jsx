import React from 'react';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import { useEffect } from 'react';
import List from './pages/List';
import Layout from './components/Layout';
import Add from './pages/Add';
import Order from './pages/Order';
import Users from './pages/Users';

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : ''
  );

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);
  return (
    <>
      {token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <Layout setToken={setToken}>
          <Routes>
            <Route path='/' element={<List />} />
            <Route path='/add' element={<Add />} />
            <Route path='/order' element={<Order />} />
            <Route path='/users' element={<Users token={token}/>} />
          </Routes>
        </Layout>
      )}
    </>
  );
};

export default App;
