import React from 'react';
import './ProductCard.css';

const ProductCard = ({ image, icon, title, description, tags, price, onAddToCart, onShowDetails }) => {
  return (
    <div className="product-card" onClick={onShowDetails} style={{ cursor: 'pointer' }}>
      <div className="card-image-container">
        <img src={image} alt={title} className="card-image" />
      </div>

      <div className="card-content">
        <div className="card-header">
          <span className="product-icon">{icon}</span>
          <h3 className="product-title">{title}</h3>
        </div>

        <p className="product-description">{description}</p>

        <div className="product-tags">
          {tags.map((tag, index) => (
            <span key={index} className="tag-pill">{tag}</span>
          ))}
        </div>

        <div className="card-footer">
          <div className="price-section">
            <span className="currency">R$</span>
            <span className="price">{price}</span>
            <span className="price-period">/mês</span>
          </div>
          <div className="card-actions">
            <button className="buy-button" onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}>
              Adicionar ao Carrinho
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
