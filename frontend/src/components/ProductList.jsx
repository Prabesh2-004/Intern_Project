// src/components/ProductList.jsx
import { useCart } from '../context/CartContext';

const ProductList = () => {
  const { addToCart } = useCart();

  const products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Phone', price: 699 },
    { id: 3, name: 'Headphones', price: 199 }
  ];

  return (
    <div>
      <h2>Products</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;