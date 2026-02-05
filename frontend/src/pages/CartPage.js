import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/api';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth(); // We need the user to know who is placing the order
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Handle the checkout process
  const handleCheckout = async () => {
    try {
      setLoading(true);

      // 3. Prepare the real order data for our backend
      // We map our cart items to match what the server expects (id and quantity)
      const orderData = {
        items: cartItems.map(item => ({
          id: item.id || item._id,
          quantity: item.quantity
        })),
        totalAmount: cartTotal,
        customerInfo: {
          name: user ? user.name : 'Guest',
          email: user ? user.email : 'guest@example.com'
        }
      };

      console.log('Sending order to server...', orderData);

      // 4. CALL THE ACTUAL API!
      // This sends the data to our Node.js server to be saved in the database.
      await apiService.createOrder(orderData);

      // 5. Success! Clear the cart and tell the user.
      clearCart();
      alert('Success! Your order has been placed. Enjoy your Café Oasis experience!');

      // 6. Send the user to the Dashboard to see their orders
      navigate('/dashboard');

    } catch (error) {
      // 7. Error Handling: Always prepare for things to go wrong (like network issues)!
      console.error('Checkout failed:', error);
      alert(`Oops! Something went wrong: ${error.message}`);
    } finally {
      // 8. Stop the loading state regardless of success or failure
      setLoading(false);
    }
  };

  /** RENDERING (THE JSX)
   * This is where we define the visual structure of the page.
   */
  return (
    <div className="cart-page-wrapper">
      <div className="cart-content-container">

        {/* HEADER SECTION */}
        <header className="cart-page-header">
          <h1 className="main-title">Your Cart</h1>
          <p className="subtitle">Treat yourself to something wonderful at Oasis</p>
        </header>

        {/* CONDITIONAL RENDERING: Check if cart is empty */}
        {cartItems.length === 0 ? (

          /* VIEW 1: EMPTY CART */
          <div className="empty-cart-view">
            <img
              src="/assets/empty-cart.png"
              alt="An empty coffee cup"
              className="empty-cart-hero-image"
            />
            <h2>Your cart is empty</h2>
            <p>Wait, you haven't picked your favorite coffee yet! Explore our menu and find your perfect blend.</p>
            <Link to="/menu" className="action-button-primary">Explore Menu</Link>
          </div>

        ) : (

          /* VIEW 2: CART WITH ITEMS */
          <div className="filled-cart-layout">

            {/* LEFT SIDE: LIST OF ITEMS */}
            <main className="cart-items-list">
              <h2 className="section-heading">Review Your Items</h2>

              {cartItems.map((itemInCart) => (
                <div key={itemInCart.id || itemInCart._id} className="cart-item-card">
                  <img src={itemInCart.image} alt={itemInCart.name} className="item-thumbnail" />

                  <div className="item-details">
                    <h3>{itemInCart.name}</h3>
                    <p className="item-price-tag">${itemInCart.price.toFixed(2)}</p>

                    {/* QUANTITY CONTROLS */}
                    <div className="quantity-editor">
                      <button
                        onClick={() => updateQuantity(itemInCart.id || itemInCart._id, itemInCart.quantity - 1)}
                        className="qty-btn"
                      >-</button>
                      <span className="qty-number">{itemInCart.quantity}</span>
                      <button
                        onClick={() => updateQuantity(itemInCart.id || itemInCart._id, itemInCart.quantity + 1)}
                        className="qty-btn"
                      >+</button>
                    </div>
                  </div>

                  {/* REMOVE BUTTON */}
                  <button
                    className="remove-item-btn"
                    onClick={() => removeFromCart(itemInCart.id || itemInCart._id)}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                className="clear-all-btn"
                onClick={clearCart}
                disabled={loading}
              >
                Clear Entire Cart
              </button>
            </main>

            {/* RIGHT SIDE: ORDER SUMMARY */}
            <aside className="order-summary-sidebar">
              <div className="summary-box">
                <h2 className="section-heading">Order Summary</h2>

                <div className="calculation-row">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>

                <div className="calculation-row">
                  <span>Delivery</span>
                  <span className="free-text">FREE</span>
                </div>

                <hr className="summary-divider" />

                <div className="calculation-row total-row">
                  <span>Grand Total</span>
                  <span className="grand-total-amount">${cartTotal.toFixed(2)}</span>
                </div>

                <button
                  className="place-order-button"
                  onClick={handleCheckout}
                  disabled={loading}
                >
                  {loading ? 'Processing Order...' : 'Place My Order'}
                </button>

                <div className="security-notice">
                  <span>🔒 Your payment is safe and secure</span>
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
