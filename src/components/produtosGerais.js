import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import './produtosGerais.css';
import placeholderImg from '../assets/product1.png';

const ProdutosGerais = ({ onAddToCart }) => {
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Faz a requisição real para o backend
    fetch('http://localhost:3001/api/modules')
      .then(res => {
        if (!res.ok) {
          throw new Error(`Erro HTTP: status ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (!Array.isArray(data)) {
          throw new Error('A API não retornou um formato de array válido.');
        }

        // 2. Adapta o dado que vem do banco para o formato visual que o React espera
        const formattedModules = data.map(item => ({
          id: String(item.id),
          image: placeholderImg,
          icon: '📦',
          title: `[${item.squad}] - ${item.name}`,
          description: item.description || 'Sem descrição',
          fullDescription: item.description || 'Módulo sem descrição detalhada',
          tags: [item.status, item.squad],
          price: '99'
        }));
        
        setModules(formattedModules);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao buscar módulos da API:', err);
        setError(err.message || 'Erro de conexão (pode ser CORS ou servidor offline)');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Carregando módulos da API...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: '#ff4d4f' }}>
        <h3>Erro ao tentar carregar os módulos</h3>
        <p>{error}</p>
        <p style={{ fontSize: '14px', color: '#666' }}>Dica: Pressione F12 e olhe o Console ou a aba Network para ver se a requisição foi bloqueada (ex: CORS ou localhost vs 127.0.0.1).</p>
      </div>
    );
  }

  if (modules.length === 0) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Nenhum módulo retornado pela API.</div>;
  }

  return (
    <div className="product-grid">
      {modules.map((p) => (
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
