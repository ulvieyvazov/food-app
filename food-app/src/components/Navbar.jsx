import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🍳 Lezzet Durağı
        </Link>
        <ul className="navbar-menu">
          <li><Link to="/">Anasayfa</Link></li>
          <li><Link to="/categories">Kategoriler</Link></li>
          <li><Link to="/about" style={{color: "red"}}>Hakkındksssssssssssssssssssssssssssssssssssssssssssa</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
