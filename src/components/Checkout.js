import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = ({ cartItems, onRemoveItem, onClearCart }) => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // States para os dados do usuário (MVP: Nome e Email)
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0);

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMessage(null);

    const payload = {
      customerName,
      customerEmail,
      items: cartItems.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price
      }))
    };

    try {
      const response = await fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao processar pagamento.');
      }

      // Limpa o carrinho apenas se a API retornou sucesso
      if (onClearCart) onClearCart();
      setIsSuccess(true);
    } catch (error) {
      console.error('Erro no checkout:', error);
      setErrorMessage(error.message || 'Falha ao conectar ao servidor.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="success-screen">
        <div className="success-icon">✓</div>
        <h2>Pedido Confirmado!</h2>
        <p>Obrigado por escolher a Plataforma DevOps. Seus módulos serão ativados em instantes no seu painel.</p>
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
                      <p>SaaS Agil - Plano Mensal</p>
                    </div>
                    <div className="cart-item-price">
                      <span>R$ {item.price}</span>
                      <button type="button" className="remove-item" onClick={() => onRemoveItem(item.cartId)}>Remover</button>
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
          <h3>Detalhes do Pedido</h3>
          {errorMessage && (
            <div style={{ backgroundColor: '#ffefef', color: '#cc0000', padding: '12px', borderRadius: '4px', marginBottom: '16px', border: '1px solid #ffcccc' }}>
              <strong>Erro:</strong> {errorMessage}
            </div>
          )}
          <form className="checkout-form" onSubmit={handleCheckout}>
            <div className="form-group">
              <label>Nome Completo</label>
              <input 
                type="text" 
                placeholder="Ex: Matheus Yamauti" 
                required 
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email Corporativo</label>
              <input 
                type="email" 
                placeholder="nome@empresa.com" 
                required 
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </div>
            {/* Mantido o front do cartão apenas por estética, mas não enviamos no payload */}
            <div className="form-group">
              <label>Número do Cartão (Teste)</label>
              <div className="card-input-wrapper">
                <input type="text" placeholder="0000 0000 0000 0000" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Validade</label>
                <input type="text" placeholder="MM/YY" />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input type="text" placeholder="000" />
              </div>
            </div>
            <button
              type="submit"
              className={`checkout-submit ${isProcessing ? 'processing' : ''}`}
              disabled={isProcessing || cartItems.length === 0}
            >
              {isProcessing ? 'Processando Pedido...' : `Confirmar Pedido de R$ ${subtotal.toFixed(2)}`}
            </button>
          </form>
          <p className="secure-text">
            🛡️ Ambiente de teste. Seus dados estão seguros.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
