import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import './ProductDetails.css';

const ProductDetails = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="product-details-view" style={{ textAlign: 'center', padding: '100px 0' }}>
        <h2>Produto não encontrado</h2>
        <button className="back-button" onClick={() => navigate(-1)} style={{ margin: '20px auto' }}>
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="product-details-view">
      <div className="details-nav">
        <button className="back-button" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Voltar para Soluções
        </button>
      </div>

      <div className="details-hero">
        <div className="hero-content">
          <div className="product-badge">Premium Solution</div>
          <h1 className="details-title">
            Explore tudo sobre o <span className="gradient-text">{product.title}</span>
          </h1>
          <p className="details-description">{product.fullDescription}</p>
          
          <div className="details-tags">
            {product.tags.map((tag, i) => (
              <span key={i} className="detail-tag">#{tag}</span>
            ))}
          </div>

          <div className="premium-features">
            <div className="feature-item">
              <span className="feature-icon">✨</span>
              <div className="feature-text">
                <h5>Inteligência Artificial</h5>
                <p>Processamento em tempo real com Redes Neurais.</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔒</span>
              <div className="feature-text">
                <h5>Camada de Segurança</h5>
                <p>Criptografia ponta a ponta e conformidade total.</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🚀</span>
              <div className="feature-text">
                <h5>Escalabilidade Ilimitada</h5>
                <p>Pronto para suportar o crescimento do seu time.</p>
              </div>
            </div>
          </div>

          <div className="details-actions">
            <div className="details-price">
              <span className="price-label">Plano Mensal</span>
              <div className="price-value">
                <span className="currency">R$</span>
                <span className="amount">{product.price}</span>
                <span className="period">/mês</span>
              </div>
            </div>
            <button className="main-buy-button" onClick={() => onAddToCart(product)}>
              Assinar Agora
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="details-visual">
          <div className="visual-wrapper">
            <img src={product.image} alt={product.title} className="hero-img" />
            <div className="visual-overlay"></div>
          </div>
          <div className="floating-card info-1">
            <span className="card-icon">⚡</span>
            <div>
              <h6>Performance</h6>
              <p>+40% de agilidade</p>
            </div>
          </div>
          <div className="floating-card info-2">
            <span className="card-icon">📈</span>
            <div>
              <h6>Analytics</h6>
              <p>Relatórios Diários</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
