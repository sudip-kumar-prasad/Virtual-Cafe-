import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/button';

const OrderSuccessPage = () => {
    return (
        <div className="section" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <div className="container" style={{ maxWidth: '600px' }}>
                <div style={{
                    backgroundColor: 'white',
                    padding: '3rem 2rem',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                        ✅
                    </div>
                    <h1 className="section-title" style={{ marginBottom: '1rem' }}>Order Placed!</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', marginBottom: '2rem' }}>
                        Thank you for your order. We are preparing it with care.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link to="/menu">
                            <Button variant="default">Order More</Button>
                        </Link>
                        <Link to="/dashboard">
                            <Button variant="outline" style={{
                                border: '1px solid var(--primary)',
                                color: 'var(--primary)',
                                backgroundColor: 'transparent'
                            }}>
                                View Dashboard
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
