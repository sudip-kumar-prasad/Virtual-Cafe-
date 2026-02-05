import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api';

const OrderHistoryPage = () => {
    // State to store the list of orders
    const [orders, setOrders] = useState([]);

    // State to handle the loading status (true by default)
    const [loading, setLoading] = useState(true);

    // State to store any errors that occur
    const [error, setError] = useState(null);

    // useEffect runs once when the component mounts (loads)
    useEffect(() => {
        // Define an async function to fetch orders from the backend
        const fetchOrders = async () => {
            try {
                // Call the API Service to get "my orders"
                const response = await apiService.getMyOrders();

                // Update state with the data received
                setOrders(response.data);
            } catch (err) {
                // If something goes wrong, save the error message
                setError(err.message || 'Failed to fetch orders');
            } finally {
                // Whether successful or failed, turn off loading spinner
                setLoading(false);
            }
        };

        // Execute the function we just defined
        fetchOrders();
    }, []); // Empty dependency array [] means run only once

    // 1. Loading State: Show a message while waiting for data
    if (loading) {
        return (
            <div className="section">
                <div className="container" style={{ textAlign: 'center' }}>
                    <p>Loading your orders...</p>
                </div>
            </div>
        );
    }

    // 2. Error State: Show an error message if the API call failed
    if (error) {
        return (
            <div className="section">
                <div className="container">
                    <div style={{ padding: '1rem', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: '8px' }}>
                        Error: {error}
                    </div>
                </div>
            </div>
        );
    }

    // 3. Success State: Render the list of orders
    return (
        <div className="section">
            <div className="container">
                <h1 className="section-title">My Orders</h1>

                {/* Check if the orders list is empty */}
                {orders.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'var(--gray-light)', borderRadius: 'var(--radius-lg)' }}>
                        <h2>No orders yet</h2>
                        <p style={{ margin: '1rem 0' }}>Looks like you haven't ordered anything yet.</p>
                        <Link to="/menu" className="btn">Browse Menu</Link>
                    </div>
                ) : (
                    /* If we have orders, map (loop) through them and display each one */
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {orders.map(order => (
                            <div key={order._id} className="card" style={{ padding: '1.5rem' }}>

                                {/* Order Header: Number, Date, Status, Total */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--gray)', paddingBottom: '0.5rem' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Order #{order.orderNumber}</h3>
                                        <span style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
                                            {/* Format the date to be readable */}
                                            {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                                        </span>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        {/* Status Badge with dynamic colors */}
                                        <span style={{
                                            display: 'inline-block',
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '4px',
                                            backgroundColor: order.status === 'completed' ? '#dcfce7' : '#fef9c3',
                                            color: order.status === 'completed' ? '#166534' : '#854d0e',
                                            fontWeight: 'bold',
                                            fontSize: '0.9rem'
                                        }}>
                                            {order.status.toUpperCase()}
                                        </span>
                                        <div style={{ fontWeight: 'bold', marginTop: '0.5rem' }}>
                                            Total: ${order.totalAmount.toFixed(2)}
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items List */}
                                <div style={{ marginBottom: '1rem' }}>
                                    {order.items.map((item, index) => (
                                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span>{item.quantity}x {item.name}</span>
                                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderHistoryPage;
