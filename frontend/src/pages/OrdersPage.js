import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api';
import './OrdersPage.css';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await apiService.getUserOrders();
                setOrders(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pending': return '#FFA500';
            case 'preparing': return '#2196F3';
            case 'completed': return '#4CAF50';
            case 'cancelled': return '#F44336';
            default: return 'var(--text-secondary)';
        }
    };

    return (
        <div className="section">
            <div className="container">
                <h1 className="section-title">Order History</h1>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: 'var(--spacing-xxl)' }}>
                        <div className="loader"></div>
                        <p>Loading your orders...</p>
                    </div>
                ) : error ? (
                    <div className="error-message" style={{ textAlign: 'center', color: 'red' }}>
                        {error}
                    </div>
                ) : orders.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: 'var(--spacing-xxl)' }}>
                        <h2>No orders yet</h2>
                        <p style={{ marginBottom: 'var(--spacing-lg)' }}>Treat yourself to something from our menu!</p>
                        <Link to="/menu" className="btn">Browse Menu</Link>
                    </div>
                ) : (
                    <div className="orders-list">
                        {orders.map(order => (
                            <div key={order.id} className="order-card card">
                                <div className="order-header">
                                    <div className="order-info">
                                        <h3>Order #{order.id}</h3>
                                        <p className="order-date">{new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString()}</p>
                                    </div>
                                    <div className="order-status" style={{
                                        backgroundColor: `${getStatusColor(order.status)}22`,
                                        color: getStatusColor(order.status),
                                        padding: '4px 12px',
                                        borderRadius: '20px',
                                        fontSize: '0.85rem',
                                        fontWeight: 'bold',
                                        textTransform: 'capitalize'
                                    }}>
                                        {order.status}
                                    </div>
                                </div>

                                <div className="order-items-list">
                                    <p><strong>Items:</strong> {order.items}</p>
                                </div>

                                <div className="order-footer">
                                    <div className="order-total">
                                        <span>Total:</span>
                                        <strong>${parseFloat(order.total).toFixed(2)}</strong>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;
