import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3 className="footer-title">Oasis Café</h3>
            <p>Bringing the café experience to your virtual space. Enjoy quality coffee and food right from your device.</p>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/menu">Menu</a></li>
              <li><a href="/cart">Cart</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Hours</h3>
            <ul className="footer-links">
              <li>Mon - Fri: 7am - 7pm</li>
              <li>Saturday: 8am - 8pm</li>
              <li>Sunday: 8am - 3pm</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Contact</h3>
            <ul className="footer-links">
              <li>123 Coffee Street</li>
              <li>Café Town, CT 12345</li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: info@oasiscafe.com</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Oasis Café. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;