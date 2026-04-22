import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin({
        name: formData.name || formData.email.split('@')[0],
        email: formData.email
      });
      navigate('/');
    }, 1500);
  };

  return (
    <div className="login-view">
      <div className="login-card">
        <div className="login-header">
          <h2>{isRegister ? 'Criar Conta' : 'Acesse sua Conta'}</h2>
          <p>{isRegister ? 'Junte-se ao futuro do gerenciamento ágil.' : 'Bem-vindo de volta à GP2026.'}</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {isRegister && (
            <div className="form-group">
              <label>Nome Completo</label>
              <input
                type="text"
                placeholder="Seu nome"
                required
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          )}
          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              placeholder="seu@email.com"
              required
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              required
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          {!isRegister && (
            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Lembrar de mim
              </label>
              <button type="button" className="link-btn">Esqueceu a senha?</button>
            </div>
          )}

          <button
            type="submit"
            className={`login-submit ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Aguarde...' : (isRegister ? 'Criar Conta' : 'Entrar na Plataforma')}
          </button>
        </form>

        <div className="login-divider">
          <span>ou continue com</span>
        </div>

        <div className="social-login">
          <button className="social-btn">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="20" />
            Google
          </button>
        </div>

        <div className="login-footer">
          <p>
            {isRegister ? 'Já possui uma conta?' : 'Não tem uma conta?'}
            <button className="link-btn toggle-auth" onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? 'Fazer Login' : 'Cadastre-se grátis'}
            </button>
          </p>
          <button className="back-home-btn" onClick={() => navigate('/')}>Voltar para o site</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
