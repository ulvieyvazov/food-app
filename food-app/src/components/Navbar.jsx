import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout, subscribeAuth } from '../store/authStore.js';

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => getCurrentUser());

  useEffect(() => {
    const unsub = subscribeAuth(setUser);
    return () => unsub();
  }, []);

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🍳 Lezzet Durağı
        </Link>
        <ul className="navbar-menu">
          <li><Link to="/">Anasayfa</Link></li>
          <li><Link to="/categories">Kategoriler</Link></li>
          <li><Link to="/about">Hakkında</Link></li>
          {user ? (
            <>
              <li style={{opacity: 0.9}}>{user.username}</li>
              <li><button onClick={handleLogout} className="btn" style={{background:'#111827', color:'#fff', padding:'0.45rem 0.8rem'}}>Çıkış</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Giriş</Link></li>
              <li><Link to="/register">Kayıt Ol</Link></li>
              <li><Link to="/admin">admin</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
