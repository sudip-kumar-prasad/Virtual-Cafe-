import React, { useState } from 'react';

/** GLOBAL DATA
 * We import our 'useCart' hook so this individual coffee card 
 * can talk to the global shopping cart.
 */
import { useCart } from '../context/CartContext';

/** THE MENU ITEM COMPONENT
 * It receives one prop called 'item' which contains name, price, description, etc.
 */
const MenuItem = ({ item }) => {
  // HOOKS: Tools from React
  const { addToCart, updateQuantity, cartItems } = useCart();
  const [imageError, setImageError] = useState(false);
  const [showControls, setShowControls] = useState(false);

  // Fallback image if the coffee photo doesn't load
  const fallbackImage = "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=400&h=300";

  /** LOGIC: Is this item in the cart?
   * We search the global 'cartItems' list to see if this specific coffee is already in it.
   */
  const uniqueId = item._id || item.id;
  const foundInCart = cartItems.find(cartItem => (cartItem._id || cartItem.id) === uniqueId);

  // If found, we use its quantity, otherwise 0.
  const currentQuantity = foundInCart ? foundInCart.quantity : 0;

  /** ACTION: Add to Cart
   * This runs when the "Add to Cart" button is clicked for the first time.
   */
  const handleAddAction = () => {
    addToCart(item);
    setShowControls(true);

    // Simple toast notification - creating an element manually for education
    const toastElem = document.createElement('div');
    toastElem.className = 'quick-toast';
    toastElem.textContent = `Adding ${item.name} to cart...`;
    toastElem.style.cssText = `
      position: fixed; bottom: 20px; right: 20px;
      background: #A0522D; color: white; padding: 12px 24px;
      border-radius: 8px; z-index: 9999;
      animation: toastIn 0.3s forwards;
    `;
    document.body.appendChild(toastElem);
    setTimeout(() => toastElem.remove(), 2500);
  };

  /** ACTION: Change Quantity
   * This runs when the + or - buttons are clicked.
   */
  const handleQtyChange = (newQty) => {
    if (newQty <= 0) {
      updateQuantity(uniqueId, 0); // This will remove the item from cart
      setShowControls(false);
    } else {
      updateQuantity(uniqueId, newQty);
    }
  };

  /** UI: Rendering the Card */
  return (
    <div className="single-menu-card">

      {/* 1. IMAGE PART */}
      <div className="card-image-box">
        <img
          src={imageError ? fallbackImage : item.image}
          alt={item.name}
          onError={() => setImageError(true)}
        />
      </div>

      {/* 2. TEXT CONTENT PART */}
      <div className="card-info-box">
        <h3 className="card-title">{item.name}</h3>
        <p className="card-price-tag">${item.price.toFixed(2)}</p>
        <p className="card-description">{item.description}</p>

        {/* 3. BUTTONS SECTION (Conditional) */}
        <div className="card-interact-zone">
          {(showControls || currentQuantity > 0) ? (

            /* VIEW A: Quantity Controls (+ and -) */
            <div className="qty-picker">
              <button
                className="qty-btn-minus"
                onClick={() => handleQtyChange(currentQuantity - 1)}
              >-</button>

              <span className="qty-disp">{currentQuantity}</span>

              <button
                className="qty-btn-plus"
                onClick={() => handleQtyChange(currentQuantity + 1)}
              >+</button>
            </div>

          ) : (

            /* VIEW B: Simple Add Button */
            <button
              className="card-add-button"
              onClick={handleAddAction}
            >
              Add to Cart
            </button>

          )}
        </div>
      </div>

      {/* INLINE CSS FOR TEACHING: Simple animations */}
      <style>
        {`
          @keyframes toastIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }

          .single-menu-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0,0,0,0.05);
            transition: 0.2s;
          }

          .single-menu-card:hover { 
            transform: translateY(-5px); 
            box-shadow: 0 8px 20px rgba(0,0,0,0.1);
          }

          .card-image-box img { 
            width: 100%; height: 200px; object-fit: cover; 
          }

          .card-info-box { padding: 20px; text-align: center; }
          .card-title { margin: 0 0 5px 0; font-family: 'Playfair Display', serif; }
          .card-price-tag { color: #A0522D; font-weight: bold; margin-bottom: 10px; }
          .card-description { font-size: 0.9rem; color: #666; height: 40px; overflow: hidden; }

          .card-add-button {
            width: 100%; background: #A0522D; color: white;
            border: none; padding: 10px; border-radius: 6px;
            font-weight: bold; cursor: pointer; margin-top: 15px;
          }

          .qty-picker {
            display: flex; justify-content: center; align-items: center;
            gap: 15px; margin-top: 15px; background: #f9f9f9;
            padding: 8px; border-radius: 8px;
          }

          .qty-disp { font-weight: bold; font-size: 1.1rem; }
          
          .qty-btn-minus, .qty-btn-plus {
            background: #A0522D; color: white; border: none;
            width: 30px; height: 30px; border-radius: 4px; cursor: pointer;
          }
        `}
      </style>
    </div>
  );
};

export default MenuItem;