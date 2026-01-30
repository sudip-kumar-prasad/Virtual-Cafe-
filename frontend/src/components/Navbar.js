import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
<<<<<<< HEAD
import { useCart } from '../context/CartContext';
import './Navbar.css';
=======
>>>>>>> c4abbcd45b2c8831cbb9095bdb2d7bf3defdfa50

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
<<<<<<< HEAD
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const cartCount = cartItems ? cartItems.reduce((acc, item) => acc + item.quantity, 0) : 0;

=======
  const navigate = useNavigate();

>>>>>>> c4abbcd45b2c8831cbb9095bdb2d7bf3defdfa50
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

<<<<<<< HEAD
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
            <li><Link to="/" onClick={closeMenu}>Home</Link></li>

            {user && (
              <>
                <li><Link to="/dashboard" onClick={closeMenu}>Dashboard</Link></li>
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
                  Hi, {user.name.split(' ')[0]}
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
=======
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
              <span className="user-name">Hi, {user.name}</span>
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
>>>>>>> c4abbcd45b2c8831cbb9095bdb2d7bf3defdfa50
    </header>
  );
};

<<<<<<< HEAD
export default Navbar;
=======
export default Navbar;
>>>>>>> c4abbcd45b2c8831cbb9095bdb2d7bf3defdfa50
