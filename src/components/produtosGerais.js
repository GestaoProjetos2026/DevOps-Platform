import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import './produtosGerais.css';

const ProdutosGerais = ({ onAddToCart }) => {
  const navigate = useNavigate();

  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          {...p}
          onAddToCart={() => onAddToCart(p)}
          onShowDetails={() => navigate(`/produto/${p.id}`)}
        />
      ))}
    </div>
  );
};

export default ProdutosGerais;
