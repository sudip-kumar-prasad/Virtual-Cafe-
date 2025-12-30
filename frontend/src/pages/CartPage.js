import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

const CartPage = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();

  const handleCheckout = () => {
    alert('Thank you for your order! In a real application, you would be redirected to a payment processor.');
    clearCart();
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Your Cart</h1>
        
        {cartItems.length === 0 ? (
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
                <button className="btn btn-secondary" onClick={clearCart}>Clear Cart</button>
              </div>
            </div>
            
            <div className="cart-summary">
              <div className="card">
                <h2 style={{ marginTop: 0 }}>Order Summary</h2>
                
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
                
                <button className="btn" style={{ width: '100%' }} onClick={handleCheckout}>
                  Proceed to Checkout
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
