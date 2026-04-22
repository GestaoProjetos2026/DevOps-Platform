import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = ({ cartItems, onRemoveItem }) => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="success-screen">
        <div className="success-icon">✓</div>
        <h2>Pagamento Confirmado!</h2>
        <p>Obrigado por escolher a GP2026. Seus produtos estarão disponíveis em instantes no seu dashboard.</p>
        <button className="back-btn" onClick={() => navigate('/')}>Voltar para o Início</button>
      </div>
    );
  }

  return (
    <div className="checkout-view">
      <div className="checkout-header">
        <button className="back-link" onClick={() => navigate('/')}>
          ← Voltar para soluções
        </button>
        <h1>Finalizar Compra</h1>
      </div>

      <div className="checkout-grid">
        <div className="cart-summary">
          <h3>Seu Carrinho ({cartItems.length} itens)</h3>
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Seu carrinho está vazio.</p>
              <button className="browse-btn" onClick={() => navigate('/')}>Ver Soluções</button>
            </div>
          ) : (
            <>
              <div className="cart-items-list">
                {cartItems.map((item) => (
                  <div key={item.cartId} className="cart-item">
                    <img src={item.image} alt={item.title} className="cart-item-img" />
                    <div className="cart-item-info">
                      <h4>{item.title}</h4>
                      <p>SaaS Agil - Plano Premium</p>
                    </div>
                    <div className="cart-item-price">
                      <span>R$ {item.price}</span>
                      <button className="remove-item" onClick={() => onRemoveItem(item.cartId)}>Remover</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="summary-total">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Impostos e taxas</span>
                  <span>Grátis</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="checkout-form-container">
          <h3>Detalhes de Pagamento</h3>
          <form className="checkout-form" onSubmit={handleCheckout}>
            <div className="form-group">
              <label>Nome Completo</label>
              <input type="text" placeholder="Ex: Matheus Yamauti" required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="nome@exemplo.com" required />
            </div>
            <div className="form-group">
              <label>Número do Cartão</label>
              <div className="card-input-wrapper">
                <input type="text" placeholder="0000 0000 0000 0000" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Validade</label>
                <input type="text" placeholder="MM/YY" required />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input type="text" placeholder="000" required />
              </div>
            </div>
            <button 
              type="submit" 
              className={`checkout-submit ${isProcessing ? 'processing' : ''}`}
              disabled={isProcessing || cartItems.length === 0}
            >
              {isProcessing ? 'Processando...' : `Pagar R$ ${subtotal.toFixed(2)}`}
            </button>
          </form>
          <p className="secure-text">
            🛡️ Pagamento seguro e criptografado
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
