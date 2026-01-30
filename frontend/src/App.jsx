import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
<<<<<<< HEAD
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
=======
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
>>>>>>> c4abbcd45b2c8831cbb9095bdb2d7bf3defdfa50
import NotFound from './pages/NotFound';
import './index.css';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
<<<<<<< HEAD
          <div className="app" style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
          }}>
            <Navbar />
            <main className="main-content" style={{
=======
          <div className="app" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh' 
          }}>
            <Navbar />
            <main className="main-content" style={{ 
>>>>>>> c4abbcd45b2c8831cbb9095bdb2d7bf3defdfa50
              flex: 1,
              padding: '2rem 0'
            }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
<<<<<<< HEAD
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } />
                <Route path="/menu" element={
                  <ProtectedRoute>
                    <MenuPage />
                  </ProtectedRoute>
                } />
                <Route path="/cart" element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                } />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={
                  <ProtectedRoute>
                    <ContactPage />
                  </ProtectedRoute>
                } />
                <Route path="/login" element={<LoginPage />} />
=======
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/signin" element={<SigninPage />} />
>>>>>>> c4abbcd45b2c8831cbb9095bdb2d7bf3defdfa50
                <Route path="/signup" element={<SignupPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> c4abbcd45b2c8831cbb9095bdb2d7bf3defdfa50
