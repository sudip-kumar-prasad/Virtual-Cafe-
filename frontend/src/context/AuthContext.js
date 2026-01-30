import React, { createContext, useState, useContext, useEffect } from 'react';
<<<<<<< HEAD

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check if user is logged in
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // Register user
    const register = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:5001/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            localStorage.setItem('user', JSON.stringify(data));
            setUser(data);
            setLoading(false);
            return data;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            throw err;
        }
    };

    // Login user
    const login = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:5001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('user', JSON.stringify(data));
            setUser(data);
            setLoading(false);
            return data;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            throw err;
        }
    };

    // Logout user
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    const value = {
        user,
        loading,
        error,
        register,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
=======
import apiService from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const signup = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.register(userData);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signin = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.login(credentials);
      
      // Store token and user data
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);
      
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, signup, signin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
>>>>>>> c4abbcd45b2c8831cbb9095bdb2d7bf3defdfa50
