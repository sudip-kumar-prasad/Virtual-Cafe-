import React from 'react';

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  return (
    <div className="cart-item">
      <div className="cart-item-details">
        <h4>{item.name}</h4>
        <p>${item.price.toFixed(2)} each</p>
      </div>
      
      <div className="cart-item-actions">
        <button className="btn btn-secondary" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
        <span className="cart-item-quantity">{item.quantity}</span>
        <button className="btn btn-secondary" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
        <button className="btn btn-secondary" onClick={() => removeFromCart(item.id)}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;