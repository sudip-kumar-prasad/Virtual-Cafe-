import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="section">
      <div className="container" style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: 'var(--spacing-lg)' }}>404</h1>
        <h2>Page Not Found</h2>
        <p style={{ marginBottom: 'var(--spacing-xl)' }}>
          We couldn't find the page you were looking for. Perhaps you'd like to try one of these:
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-md)' }}>
          <Link to="/" className="btn">Go to Home</Link>
          <Link to="/menu" className="btn btn-secondary">Browse Menu</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
