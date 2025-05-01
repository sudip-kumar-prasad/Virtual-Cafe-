import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const MenuItem = ({ item }) => {
  const [imageError, setImageError] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const { addToCart, updateQuantity, cartItems } = useCart();
  const fallbackImage = "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=400&h=300";

  const handleImageError = () => {
    setImageError(true);
  };

  // Find if item is in cart and get its quantity
  const cartItem = cartItems.find(cartItem => cartItem.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    addToCart(item);
    setShowControls(true);
    // Show toast notification
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = `${item.name} has been added to the cart`;
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: var(--primary);
      color: white;
      padding: 1rem;
      border-radius: var(--radius-md);
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      z-index: 1000;
      animation: slideIn 0.3s ease-out, fadeOut 0.3s ease-out 2.7s;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity === 0) {
      updateQuantity(item.id, 0); // This will remove the item
      setShowControls(false);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="menu-item">
      <div className="menu-item-image">
        <img 
          src={imageError ? fallbackImage : item.image} 
          alt={item.name}
          onError={handleImageError}
        />
      </div>
      <div className="menu-item-content">
        <h3 className="menu-item-title">{item.name}</h3>
        <div className="menu-item-price">${item.price.toFixed(2)}</div>
        <p className="menu-item-desc">{item.description}</p>
        <div className="quantity-controls" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: '12px',
          marginTop: 'var(--spacing-md)'
        }}>
          {(showControls || quantity > 0) ? (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              background: 'var(--secondary-light)',
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 2px 4px var(--shadow)'
            }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => handleQuantityChange(quantity - 1)}
                style={{ 
                  padding: '4px 12px',
                  minWidth: '32px',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                -
              </button>
              <span style={{ 
                minWidth: '24px', 
                textAlign: 'center',
                fontWeight: '600',
                fontSize: '1.1rem'
              }}>{quantity}</span>
              <button 
                className="btn" 
                onClick={() => handleQuantityChange(quantity + 1)}
                style={{ 
                  padding: '4px 12px',
                  minWidth: '32px',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                +
              </button>
            </div>
          ) : (
            <button 
              className="btn" 
              onClick={handleAddToCart}
              style={{ 
                width: '100%', 
                padding: '8px 16px',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 2px 4px var(--shadow)'
              }}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          
          @keyframes fadeOut {
            from {
              opacity: 1;
            }
            to {
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default MenuItem;