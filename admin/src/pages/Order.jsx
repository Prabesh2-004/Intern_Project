import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching orders from: /orders/list');

      const response = await api.get('/orders/list');
      console.log('Response:', response.data);

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        setError(response.data.message || 'Failed to fetch orders');
        alert(response.data.message || 'Failed');
      }
    } catch (err) {
      console.error('Full error object:', err);
      console.error('Error response:', err.response?.data);
      console.error('Error status:', err.response?.status);
      setError(err.response?.data?.message || 'Error fetching orders');
      alert('Error: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    console.log('Updating order:', { orderId, status });
    try {
      const response = await api.post('/orders/status', { orderId, status });
      if (response.data.success) {
        alert('Updated');
        fetchOrders();
      } else {
        alert(response.data.message || 'Failed');
      }
    } catch (err) {
      console.error('Error details:', err.response?.data);
      alert('Update failed: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <div className='p-6'>Loading...</div>;
  if (error) return <div className='p-6 text-red-600'>Error: {error}</div>;

  return (
    <div className='min-h-screen bg-gray-50 p-6 ml-20 md:p-10 mx-auto'>
      <h1 className='text-2xl mb-6'>Orders</h1>
      {orders.length === 0 ? (
        <p className='text-gray-600'>No orders found</p>
      ) : (
        <div className='space-y-4'>
          {orders.map((o) => (
            <div key={o._id} className='p-4 rounded shadow bg-white border'>
              <div className='flex justify-between'>
                <div>
                  <div className='font-semibold'>
                    {o.address?.fullName || o.userId?.username}
                  </div>
                  <div className='text-sm text-gray-600'>
                    {o.address?.email || o.userId?.email}
                  </div>
                  <div className='text-sm'>Order ID: {o._id}</div>
                </div>
                <div className='text-right'>
                  <div className='font-bold'>Rs. {o.amount}</div>
                  <div className='text-sm'>
                    {new Date(o.date).toLocaleString()}
                  </div>
                  <div className='mt-2'>
                    <select
                      value={o.status}
                      onChange={(e) => updateStatus(o._id, e.target.value)}
                      className='border p-1 rounded'
                    >
                      <option>Order Placed</option>
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Out for Delivery</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className='mt-3 text-sm'>
                <strong>Items:</strong>
                <ul className='list-disc ml-5'>
                  {o.items?.map((it, idx) => (
                    <li key={idx} className='flex items-center p-3'>
                      <img
                        src={it.images?.[0]}
                        alt={it.name}
                        className='w-8 h-8 rounded-full'
                      />
                      <span className='ml-2'>
                        {it.name} - Qty {it.quantity} - Rs. {it.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
