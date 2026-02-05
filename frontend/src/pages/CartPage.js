import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/api';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle the checkout process
  const handleCheckout = async () => {
    try {
      setLoading(true);
      setError(null);

      const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);
      const validItems = cartItems.filter(item => isValidObjectId(item._id || item.id));

      if (validItems.length === 0) {
        throw new Error("Your cart contains invalid items. Please clear your cart and add fresh items.");
      }

      const orderData = {
        items: validItems.map(item => ({
          id: item._id || item.id,
          quantity: item.quantity
        })),
        totalAmount: cartTotal,
        customerInfo: {
          name: user?.name,
          email: user?.email,
          ...(user?.phone && { phone: user.phone })
        },
        orderType: 'takeaway'
      };

      await apiService.createOrder(orderData);
      clearCart();
      navigate('/order-success');
    } catch (err) {
      console.error("Checkout error:", err);
      setError(err.message || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-page">
      <div className="cart-page-container">
        <header className="cart-header">
          <h1>Your Cart</h1>
          <p>Treat yourself to something wonderful at Oasis</p>
        </header>

        {cartItems.length === 0 ? (
          <div className="empty-cart-container">
            <img
              src="/assets/empty-cart.png"
              alt="Empty Cart"
              className="empty-cart-illustration"
            />
            <h2>Your cart is empty</h2>
            <p>Wait, you haven't picked your favorite coffee yet! Explore our menu and find your perfect blend.</p>
            <Link to="/menu" className="browse-menu-btn">Explore Menu</Link>
          </div>
        ) : (
          <div className="cart-content-grid">
            <main className="cart-items-section">
              <h2>Review Items</h2>

              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <div className="cart-item-image-wrapper">
                    <span className="cart-item-initial">{item.name.charAt(0)}</span>
                  </div>

                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-price">${item.price.toFixed(2)}</p>
                  </div>

                  <div className="cart-item-actions-wrapper">
                    <div className="quantity-controls">
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={loading}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={loading}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      disabled={loading}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <button
                className="clear-cart-btn"
                onClick={clearCart}
                disabled={loading}
              >
                Clear All Items
              </button>
            </main>

            <aside className="order-summary-section">
              <div className="order-summary-card">
                <h2>Order Summary</h2>

                <div className="summary-items">
                  {cartItems.map(item => (
                    <div key={item.id} className="summary-item">
                      <span className="summary-item-name">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="summary-item-price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="summary-divider"></div>

                <div className="summary-total">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>

                <button
                  className="checkout-btn"
                  onClick={handleCheckout}
                  disabled={loading}
                >
                  {loading ? 'Ordering...' : 'Place Order'}
                </button>

                <div className="security-badge">
                  <span>🔒 Secure Payments</span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
