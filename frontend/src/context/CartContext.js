import React, { createContext, useContext, useState, useEffect } from 'react';

/** 1. THE CONTEXT CREATION
 * Think of Context as a "Global Radio Station". 
 * Any component in the app can "tune in" to this Context to get cart data.
 */
const CartContext = createContext();

/** 2. EXPORTING THE HOOK
 * This is a shortcut function so other components can easily say 'const cart = useCart()'
 */
export const useCart = () => useContext(CartContext);

/** 3. THE PROVIDER COMPONENT
 * This component "wraps" our entire app and holds the actual data.
 */
export const CartProvider = ({ children }) => {
  // STATE: The list of items currently in the user's cart
  const [cartItems, setCartItems] = useState([]);

  // STATE: The total price of everything in the cart
  const [cartTotal, setCartTotal] = useState(0);

  /** SIDE EFFECT: Save to Folder/Memory
   * Whenever 'cartItems' changes, we want to update the total price 
   * and save the list to the browser's "LocalStorage" so it doesn't disappear if we refresh!
   */
  useEffect(() => {
    // A. Calculate Total
    // sum is the running total, item is the current one we are looking at
    const newTotal = cartItems.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );
    setCartTotal(newTotal);

    // B. Save to LocalStorage (Browser Memory)
    // We convert the array to a String because LocalStorage only stores text
    localStorage.setItem('oasis_cart_data', JSON.stringify(cartItems));
  }, [cartItems]);

  /** SIDE EFFECT: Load on Start
   * When the app first opens, we check if there's any saved cart data in the browser.
   */
  useEffect(() => {
    const savedData = localStorage.getItem('oasis_cart_data');
    if (savedData) {
      try {
        // Convert text back into a JavaScript Array
        setCartItems(JSON.parse(savedData));
      } catch (error) {
        console.error('Failed to load saved cart:', error);
        setCartItems([]);
      }
    }
  }, []);

  /** FUNCTION: addToCart
   * Adds an item, or increases quantity if it's already there.
   */
  const addToCart = (menuItem) => {
    // Step 1: Find the unique ID
    const uniqueId = menuItem._id || menuItem.id;

    setCartItems(previousItems => {
      // Step 2: Check if this item is already in our list
      const foundItem = previousItems.find(item => (item._id || item.id) === uniqueId);

      if (foundItem) {
        // SCENARIO A: Item exists! We just increase its quantity by 1.
        return previousItems.map(item =>
          (item._id || item.id) === uniqueId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // SCENARIO B: Brand new item! Add it to the list with quantity 1.
        const newItemWithQty = { ...menuItem, id: uniqueId, quantity: 1 };
        return [...previousItems, newItemWithQty];
      }
    });
  };

  /** FUNCTION: updateQuantity
   * Manual update (like clicking + or - in the cart)
   */
  const updateQuantity = (itemId, newQuantity) => {
    // If the quantity drops to 0 or less, we should just remove it!
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems(previousItems =>
      previousItems.map(item =>
        (item._id || item.id) === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  /** FUNCTION: removeFromCart
   * Completely deletes an item from the list.
   */
  const removeFromCart = (itemId) => {
    // We "filter" the list: keep everything EXCET the item we want to delete
    setCartItems(previousItems => previousItems.filter(item => (item._id || item.id) !== itemId));
  };

  /** FUNCTION: clearCart
   * Empties the entire cart.
   */
  const clearCart = () => {
    setCartItems([]);
  };

  // This is the "Package" of data we share with the rest of the app
  const sharedData = {
    cartItems,
    cartTotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  };

  return (
    <CartContext.Provider value={sharedData}>
      {children}
    </CartContext.Provider>
  );
};