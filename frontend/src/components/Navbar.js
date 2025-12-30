import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="header">
      <nav className="nav container">
        <Link to="/" className="nav-logo">Café Oasis</Link>
        
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
        
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          <li><Link to="/menu" onClick={() => setIsMenuOpen(false)}>Menu</Link></li>
          <li><Link to="/cart" onClick={() => setIsMenuOpen(false)}>Cart</Link></li>
          <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
          <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
        </ul>
        
        <div className="auth-links">
          {user ? (
            <>
              <span className="user-name">Hi, {user.user?.name || user.name}</span>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/signin" className="signin-btn" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
              <Link to="/signup" className="signup-btn" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
