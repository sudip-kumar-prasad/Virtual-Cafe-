import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartItems } = useCart();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-[#4b2e2e]">
              Oasis Café
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            <Link to="/" className="text-[#4b2e2e] hover:text-[#3a2323] text-lg font-medium">
              Home
            </Link>
            <Link to="/menu" className="text-[#4b2e2e] hover:text-[#3a2323] text-lg font-medium">
              Menu
            </Link>
            <Link to="/about" className="text-[#4b2e2e] hover:text-[#3a2323] text-lg font-medium">
              About
            </Link>
            <Link to="/contact" className="text-[#4b2e2e] hover:text-[#3a2323] text-lg font-medium">
              Contact
            </Link>
            <Link to="/cart" className="text-[#4b2e2e] hover:text-[#3a2323] relative text-lg font-medium">
              Cart
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#c45c4c] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;