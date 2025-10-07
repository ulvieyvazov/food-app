import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout, subscribeAuth } from '../store/authStore.js';
import './Navbar.css'; // CSS faylı əlavə edirik

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => getCurrentUser());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsub = subscribeAuth(setUser);
    return () => unsub();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  function handleLogout() {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            🍳 Lezzet Durağı
          </Link>

          <button
            className="navbar-toggle-btn"
            onClick={() => setIsMenuOpen(prev => !prev)}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>

          <ul className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
            <li><Link to="/" onClick={closeMenu}>Anasayfa</Link></li>
            <li><Link to="/categories" onClick={closeMenu}>Kategoriler</Link></li>
            <li><Link to="/about" onClick={closeMenu}>Hakkında</Link></li>
            {user ? (
              <>
                <li className="user-name">{user.username}</li>
                <li>
                  <button onClick={handleLogout} className="btn">Çıkış</button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" onClick={closeMenu}>Giriş</Link></li>
                <li><Link to="/register" onClick={closeMenu}>Kayıt Ol</Link></li>
                <li><Link to="/admin" onClick={closeMenu}>admin</Link></li>
              </>
            )}
          </ul>

          {isMenuOpen && <div className="overlay" onClick={closeMenu} />}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
