// components/UserOrders.jsx
import React, { useState, useEffect } from 'react';
import api from '../service/api';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders/user-orders');
      
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;

    try {
      const response = await api.post('/orders/cancel', {orderId});


      if (response.data.success) {
        alert('Order cancelled successfully!');
        fetchOrders();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Failed to cancel order');
    }
  };

  if (loading) return <div className="p-8 text-center">Loading your orders...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders yet</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID: {order._id}</p>
                  <p className="text-sm text-gray-500">
                    Placed on: {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                  <p className="mt-2 text-xl font-bold">Rs. {order.amount.toFixed(2)}</p>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold mb-2">Items:</h4>
                <ul className="text-sm">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="py-1 flex gap-3">
                        <img src={item.images[0]} alt="item" className='w-8 h-8'/>
                      {item.title} × {item.quantity} - Rs. {item.price * item.quantity}
                    </li>
                  ))}
                </ul>
              </div>

              {!['Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'].includes(order.status) && (
                <button
                  onClick={() => cancelOrder(order._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Cancel Order
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;