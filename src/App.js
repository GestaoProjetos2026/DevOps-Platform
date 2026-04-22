import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/topo';
import Tabs from './components/Tabs';
import ProductGrid from './components/produtosGerais';
import Checkout from './components/Checkout';
import Login from './components/Login';
import ProductDetails from './components/ProductDetails';

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3000);
  };

  const addToCart = (product) => {
    const alreadyInCart = cart.some(item => item.id === product.id);
    if (alreadyInCart) {
      showToast('Este módulo já está no seu carrinho!');
      return;
    }
    setCart((prevCart) => [...prevCart, { ...product, cartId: Date.now() }]);
    showToast('Adicionado ao carrinho!');
  };

  const removeFromCart = (cartId) => {
    setCart((prevCart) => prevCart.filter(item => item.cartId !== cartId));
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Navbar
          cartCount={cart.length}
          onLogout={handleLogout}
          isLoggedIn={!!user}
          userName={user?.name}
        />

        <div className="main-container">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Tabs />
                <ProductGrid onAddToCart={addToCart} />
              </>
            } />

            <Route path="/checkout" element={
              <Checkout
                cartItems={cart}
                onRemoveItem={removeFromCart}
              />
            } />

            <Route path="/login" element={
              <Login onLogin={handleLogin} />
            } />

            <Route path="/produto/:id" element={
              <ProductDetails onAddToCart={addToCart} />
            } />
          </Routes>
        </div>

        {/* Toast Notification */}
        {toast.show && (
          <div className="toast-notification">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            {toast.message}
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
