// src/components/Cart.jsx
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getTotalPrice, 
    getTotalItems 
  } = useCart();

  return (
    <div style={{ marginTop: '40px', border: '2px solid #333', padding: '20px' }}>
      <h2>Shopping Cart ({getTotalItems()} items)</h2>
      
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '10px',
              borderBottom: '1px solid #eee'
            }}>
              <div>
                <h4>{item.name}</h4>
                <p>${item.price}</p>
              </div>
              
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  +
                </button>
                <span>${item.price * item.quantity}</span>
                <button onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          
          <div style={{ marginTop: '20px' }}>
            <h3>Total: ${getTotalPrice()}</h3>
            <button onClick={clearCart} style={{ marginTop: '10px' }}>
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;