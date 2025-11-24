// src/App.jsx
import { CartProvider } from './context/CartContext';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  return (
    <CartProvider>
      <div className="App">
        <h1>My E-commerce Store</h1>
        <ProductList />
        <Cart />
      </div>
    </CartProvider>
  );
}

export default App;