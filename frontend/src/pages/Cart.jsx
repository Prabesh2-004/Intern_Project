import React from 'react';
import { useCart } from '../context/cartContext.jsx';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
    getCartItems,
  } = useCart();
  const navigate = useNavigate();

  const cartItems = getCartItems();

  if (cartItems.length === 0) {
    return (
      <div className='min-h-screen pt-20 bg-gray-50 py-8'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='bg-white rounded-lg shadow-lg p-12 text-center'>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>
              Your cart is empty
            </h2>
            <button
              onClick={() => navigate('/product')}
              className='bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700'
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-7xl mx-auto px-4'>
        <h1 className='text-3xl font-bold mb-8'>Shopping Cart</h1>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Cart Items */}
          <div className='lg:col-span-2'>
            <div className='bg-white rounded-lg shadow-lg'>
              {cartItems.map((item) => (
                <div key={item.cartKey} className='flex gap-6 p-6 border-b'>
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className='w-24 h-24 object-cover rounded'
                  />

                  <div className='flex-1'>
                    <h3 className='text-lg font-semibold'>{item.name}</h3>
                    <p className='text-gray-600'>Color: {item.color}</p>
                    <p className='text-lg font-bold text-red-600 mt-2'>
                      ${item.price}
                    </p>
                  </div>

                  <div className='flex items-center gap-3'>
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.color, item.quantity - 1)
                      }
                      className='w-8 h-8 bg-gray-200 rounded hover:bg-gray-300'
                    >
                      −
                    </button>
                    <span className='w-12 text-center font-medium'>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.color, item.quantity + 1)
                      }
                      className='w-8 h-8 bg-gray-200 rounded hover:bg-gray-300'
                    >
                      +
                    </button>
                  </div>

                  <div className='text-right min-w-[100px]'>
                    <p className='text-lg font-bold'>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item._id, item.color)}
                    className='text-red-600 hover:text-red-700'
                  >
                    <svg
                      className='w-6 h-6'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={clearCart}
              className='mt-4 text-red-600 hover:text-red-700 font-medium'
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-lg shadow-lg p-6 sticky top-8'>
              <h2 className='text-xl font-bold mb-6'>Order Summary</h2>

              <div className='space-y-4 mb-6'>
                <div className='flex justify-between'>
                  <span>Subtotal</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Shipping</span>
                  <span className='text-green-600'>Free</span>
                </div>
                <div className='border-t pt-4'>
                  <div className='flex justify-between text-xl font-bold'>
                    <span>Total</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/place-order')}
                className='w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 mb-4'
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate('/')}
                className='w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300'
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
