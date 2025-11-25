import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Product from './pages/Product'
import Contact from './pages/Contact'

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/product' element={<Product />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </Layout>
  )
}

export default App
