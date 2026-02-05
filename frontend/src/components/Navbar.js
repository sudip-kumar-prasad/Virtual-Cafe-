import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  const cartCount = cartItems ? cartItems.reduce((acc, item) => acc + item.quantity, 0) : 0;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <Link to="/" className="nav-logo" onClick={closeMenu}>Café Oasis</Link>

          <button className="menu-toggle" onClick={toggleMenu}>
            ☰
          </button>

          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            {!isHomePage && <li><Link to="/" onClick={closeMenu}>Home</Link></li>}

            {user && (
              <>
                <li><Link to="/dashboard" onClick={closeMenu}>Dashboard</Link></li>
                <li><Link to="/profile" onClick={closeMenu}>Profile</Link></li>
                <li><Link to="/menu" onClick={closeMenu}>Menu</Link></li>
                <li><Link to="/about" onClick={closeMenu}>About</Link></li>
                <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
                <li>
                  <Link to="/cart" onClick={closeMenu} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ fontSize: '1.2rem' }}>🛒</span>
                    {cartCount > 0 && (
                      <span style={{
                        backgroundColor: 'var(--accent)',
                        color: 'white',
                        borderRadius: '50%',
                        padding: '0.1rem 0.4rem',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        minWidth: '20px',
                        textAlign: 'center',
                        lineHeight: '1.2'
                      }}>
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </li>
              </>
            )}

            {user ? (
              <>
                <li className="nav-user-welcome" style={{ display: 'flex', alignItems: 'center', color: 'var(--primary)', fontWeight: 'bold' }}>
                  Hi, {user.name ? user.name.split(' ')[0] : 'User'}
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline"
                    style={{
                      padding: '0.4rem 1rem',
                      fontSize: '0.9rem',
                      marginLeft: '0.5rem'
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Link to="/login" onClick={closeMenu} style={{ fontWeight: 600 }}>Login</Link>
                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="btn"
                  style={{
                    padding: '0.4rem 1rem',
                    fontSize: '0.9rem',
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  Sign Up
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
