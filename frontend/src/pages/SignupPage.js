import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/input';
import Button from '../components/ui/button';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formError, setFormError] = useState('');

  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!name || !email || !password || !confirmPassword) {
      setFormError('Please enter all fields');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    try {
      await register({ name, email, password });
      navigate('/dashboard');
    } catch (error) {
      setFormError(error.message || 'Registration failed');
    }
  };

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '500px' }}>
        <h1 className="section-title">Create Account</h1>

        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 4px 6px var(--shadow)'
        }}>
          <form onSubmit={onSubmit}>
            {formError && (
              <div style={{
                backgroundColor: '#fee2e2',
                color: '#dc2626',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1rem',
                fontSize: '0.9rem'
              }}>
                {formError}
              </div>
            )}

            <div className="form-field">
              <label htmlFor="name">Name</label>
              <Input
                type="text"
                id="name"
                name="name"
                value={name}
                placeholder="Enter your name"
                onChange={onChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={onChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                id="password"
                name="password"
                value={password}
                placeholder="Enter password"
                onChange={onChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm password"
                onChange={onChange}
                required
              />
            </div>

            <Button
              type="submit"
              variant="default"
              isLoading={loading}
              className="w-full"
              style={{ width: '100%', marginTop: '1rem' }}
            >
              Sign Up
            </Button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-light)' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
