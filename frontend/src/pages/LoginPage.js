import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/input';
import Button from '../components/ui/button';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [formError, setFormError] = useState('');

    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setFormError('');

        if (!email || !password) {
            setFormError('Please enter all fields');
            return;
        }

        try {
            await login(formData);
            navigate('/dashboard');
        } catch (error) {
            setFormError(error.message || 'Login failed');
        }
    };

    return (
        <div className="section">
            <div className="container" style={{ maxWidth: '500px' }}>
                <h1 className="section-title">Login</h1>

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

                        <Button
                            type="submit"
                            variant="default"
                            isLoading={loading}
                            className="w-full"
                            style={{ width: '100%', marginTop: '1rem' }}
                        >
                            Login
                        </Button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-light)' }}>
                        Don't have an account? <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
