import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import apiService from '../services/api';
import CartItem from '../components/CartItem';

const CartPage = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    setIsProcessing(true);
    setError('');

    try {
      await apiService.createOrder({
        items: cartItems,
        total: cartTotal
      });

      clearCart();
      setOrderSuccess(true);
      // Wait a bit then redirect to orders
      setTimeout(() => {
        navigate('/orders');
      }, 3000);
    } catch (err) {
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Your Cart</h1>

        {orderSuccess ? (
          <div className="order-success" style={{
            textAlign: 'center',
            marginTop: 'var(--spacing-xxl)',
            padding: 'var(--spacing-xl)',
            background: 'rgba(76, 175, 80, 0.1)',
            borderRadius: 'var(--border-radius-lg)',
            border: '1px solid #4CAF50'
          }}>
            <h2 style={{ color: '#4CAF50' }}>Order Successful!</h2>
            <p style={{ marginBottom: 'var(--spacing-lg)' }}>Thank you for your order. We are preparing it now!</p>
            <p>Redirecting to your order history...</p>
            <Link to="/orders" className="btn" style={{ marginTop: 'var(--spacing-md)' }}>View Orders Now</Link>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="empty-cart" style={{ textAlign: 'center', marginTop: 'var(--spacing-xxl)' }}>
            <h2>Your cart is empty</h2>
            <p style={{ marginBottom: 'var(--spacing-lg)' }}>Add some delicious items from our menu!</p>
            <Link to="/menu" className="btn">Browse Menu</Link>
          </div>
        ) : (
          <div className="cart-container" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--spacing-xl)'
          }}>
            <div className="cart-items">
              <h2>Cart Items</h2>
              {cartItems.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                />
              ))}

              <div style={{ marginTop: 'var(--spacing-lg)' }}>
                <button className="btn btn-secondary" onClick={clearCart} disabled={isProcessing}>Clear Cart</button>
              </div>
            </div>

            <div className="cart-summary">
              <div className="card">
                <h2 style={{ marginTop: 0 }}>Order Summary</h2>

                {error && (
                  <div className="error-message" style={{
                    color: 'red',
                    marginBottom: 'var(--spacing-md)',
                    fontSize: '0.9rem'
                  }}>
                    {error}
                  </div>
                )}

                <div className="cart-summary-items" style={{ marginBottom: 'var(--spacing-lg)' }}>
                  {cartItems.map(item => (
                    <div key={item.id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 'var(--spacing-sm)'
                    }}>
                      <span>{item.name} x {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="cart-total" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  marginBottom: 'var(--spacing-lg)'
                }}>
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>

                <button
                  className="btn"
                  style={{ width: '100%' }}
                  onClick={handleCheckout}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
