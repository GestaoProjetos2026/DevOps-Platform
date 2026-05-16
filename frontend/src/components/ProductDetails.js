import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css';
import placeholderImg from '../assets/product1.png';

const ProductDetails = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // 1. Faz a requisição buscando apenas o módulo clicado
    fetch(`http://localhost:3001/api/modules/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Módulo não encontrado');
        return res.json();
      })
      .then(item => {
        // 2. Adapta os dados do banco para preencher a tela de detalhes corretamente
        setProduct({
          id: item.id.toString(),
          image: placeholderImg,
          icon: '📦',
          title: `[${item.squad}] - ${item.name}`,
          description: item.description,
          fullDescription: item.description || 'Módulo sem descrição detalhada.',
          tags: [item.status, item.squad],
          price: '99'
        });
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="product-details-view" style={{ textAlign: 'center', padding: '100px 0' }}><h2>Carregando detalhes do módulo...</h2></div>;
  }

  if (error || !product) {
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
                <h5>Integração Oficial</h5>
                <p>Módulo desenvolvido e suportado ativamente.</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔒</span>
              <div className="feature-text">
                <h5>Padronização</h5>
                <p>Compatível com os padrões da Plataforma DevOps.</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🚀</span>
              <div className="feature-text">
                <h5>Fácil Deploy</h5>
                <p>Pronto para implantação no cluster da empresa.</p>
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
              <h6>Status</h6>
              <p>{product.tags[0] === 'active' ? 'Ativo' : product.tags[0]}</p>
            </div>
          </div>
          <div className="floating-card info-2">
            <span className="card-icon">👥</span>
            <div>
              <h6>Squad</h6>
              <p>{product.tags[1]}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
