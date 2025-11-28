import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cartContext';
import api from '../service/api';

const PlaceOrder = ({ user }) => {
  const navigate = useNavigate();
  const { getTotalPrice, getCartItems, clearCart } = useCart();
  const [form, setForm] = useState({
    fullName: '',
    email: `${user?.email}`,
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    paymentMethod: 'cod',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!user) {
    navigate('/login');
    return;
  }

  setLoading(true);

  const orderData = {
    items: getCartItems(),
    amount: getTotalPrice(),
    address: {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      street: form.address,
      city: form.city,
      state: form.state,
      zip: form.zip,
    },
    paymentMethod: form.paymentMethod,
  };

  try {
    // Axios automatically sends data as JSON and includes the token from interceptor
    const response = await api.post('/orders/place', orderData);
    
    if (response.data.success) {
      alert('Order placed!');
      clearCart();
      navigate('/user-order');
    } else {
      alert(response.data.message || 'Order failed');
    }
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || 'Something went wrong');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className='bg-gray-100 min-h-screen pt-20 py-10 px-4'>
      <div className='max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 border border-gray-200'>
          <h2 className='text-3xl font-bold mb-6 text-gray-800'>
            Delivery Details
          </h2>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <input
              name='fullName'
              value={form.fullName}
              onChange={handleChange}
              placeholder='Full name'
              className='w-full p-3 border rounded'
              required
            />
            <input
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder='Email'
              className='w-full p-3 border rounded'
              required
              disabled
            />
            <input
              name='phone'
              value={form.phone}
              onChange={handleChange}
              placeholder='Phone'
              className='w-full p-3 border rounded'
              required
            />
            <textarea
              name='address'
              value={form.address}
              onChange={handleChange}
              placeholder='Street, building'
              className='w-full p-3 border rounded'
              required
            />
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
              <input
                name='city'
                value={form.city}
                onChange={handleChange}
                placeholder='City'
                className='p-3 border rounded'
                required
              />
              <input
                name='state'
                value={form.state}
                onChange={handleChange}
                placeholder='State'
                className='p-3 border rounded'
                required
              />
              <input
                name='zip'
                value={form.zip}
                onChange={handleChange}
                placeholder='ZIP'
                className='p-3 border rounded'
                required
              />
            </div>
            <div className='flex gap-4'>
              <label>
                <input
                  type='radio'
                  name='paymentMethod'
                  value='cod'
                  checked={form.paymentMethod === 'cod'}
                  onChange={handleChange}
                />{' '}
                COD
              </label>
              <label>
                <input
                  type='radio'
                  name='paymentMethod'
                  value='card'
                  checked={form.paymentMethod === 'card'}
                  onChange={handleChange}
                />{' '}
                Card
              </label>
            </div>
            <button
              type='submit'
              disabled={loading}
              className='w-full bg-indigo-600 text-white p-3 rounded'
            >
              {loading ? 'Placing...' : 'Place Order'}
            </button>
          </form>
        </div>

        <div className='bg-white rounded-2xl shadow-xl p-6 border border-gray-200 h-fit'>
          <h3 className='text-xl font-bold mb-4'>Order Summary</h3>
          <div className='space-y-4'>
            <div className='flex justify-between'>
              <span>Items</span>
              <span>{getCartItems().length}</span>
            </div>
            <hr />
            <div className='flex justify-between text-lg font-bold'>
              <span>Total</span>
              <span>Rs. {getTotalPrice().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
