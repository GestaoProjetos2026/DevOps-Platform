import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Navbar.css';

const Navbar = ({ cartCount, onLogout, isLoggedIn, userName }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (isLoggedIn) {
      onLogout();
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-left" style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
        <img src={logo} alt="GP2026 Logo" className="logo-img" />
        <span className="logo-text">GP2026</span>
      </Link>
      <div className="nav-right">
        <button className="nav-icon-btn cart-btn" onClick={() => navigate('/checkout')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
        <div
          className={`profile-wrapper ${isLoggedIn ? 'logged-in' : ''}`}
          onClick={handleProfileClick}
          title={isLoggedIn ? `Olá, ${userName} (Clique para sair)` : 'Fazer Login'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          {isLoggedIn && <span className="online-status"></span>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
