import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/api';
import CartItem from '../components/CartItem';

const CartPage = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle the checkout process
  const handleCheckout = async () => {
    try {
      // 1. Start loading state (disable button, show spinner/text)
      setLoading(true);
      setError(null);

      // Helper to validate MongoDB ObjectIds
      const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

      const validItems = cartItems.filter(item => isValidObjectId(item._id || item.id));

      if (validItems.length === 0) {
        throw new Error("Your cart contains invalid items. Please clear your cart and add fresh items.");
      }

      // 2. Prepare the order data to send to the backend
      const orderData = {
        // Map cart items to the format the API expects (ID and Quantity)
        items: validItems.map(item => ({
          id: item._id || item.id, // Ensure we have the correct ID
          quantity: item.quantity
        })),
        totalAmount: cartTotal, // Total price calculated in context
        // Customer details from the logged-in user
        customerInfo: {
          name: user?.name,
          email: user?.email,
          ...(user?.phone && { phone: user.phone }) // Only include phone if it exists
        },
        orderType: 'takeaway' // Hardcoded for now, could be a dropdown later
      };

      // 3. Send the request to the server
      await apiService.createOrder(orderData);

      // 4. If successful, clear the local cart
      clearCart();

      // 5. Navigate to the success page
      navigate('/order-success');
    } catch (err) {
      // 6. If request fails, log and show error
      console.error("Checkout error:", err);
      setError(err.message || "Failed to place order. Please try again.");
    } finally {
      // 7. Always turn off loading state, whether success or fail
      setLoading(false);
    }
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
            {error && (
              <div style={{
                gridColumn: '1 / -1',
                padding: '1rem',
                backgroundColor: '#fee2e2',
                color: '#dc2626',
                borderRadius: '8px',
                marginBottom: '1rem'
              }}>
                {error}
              </div>
            )}
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
                <button className="btn btn-secondary" onClick={clearCart} disabled={loading}>Clear Cart</button>
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

                <button
                  className="btn"
                  style={{ width: '100%' }}
                  onClick={handleCheckout}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Proceed to Checkout'}
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
