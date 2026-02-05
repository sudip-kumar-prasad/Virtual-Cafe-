import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './DashboardPage.css';

const DashboardPage = () => {
    const { user } = useAuth();

    return (
        <div className="dashboard-container container">
            <div className="dashboard-header">
                <h1>Welcome Back, {user?.name}!</h1>
                <p>Your personal oasis for coffee and treats.</p>
            </div>

            <div className="dashboard-grid">
                <div className="dashboard-card main-action">
                    <h2>Ready to Order?</h2>
                    <p>Explore our fresh menu and pick your favorites.</p>
                    <Link to="/menu" className="btn">View Menu</Link>
                </div>

                <div className="dashboard-card">
                    <h2>Your Cart</h2>
                    <p>You have items waiting in your shopping cart.</p>
                    <Link to="/cart" className="btn secondary">Go to Cart</Link>
                </div>

                <div className="dashboard-card">
                    <h2>My Orders</h2>
                    <p>Track your past delicious orders.</p>
                    <Link to="/orders" className="btn secondary">View History</Link>
                </div>

                <div className="dashboard-card">
                    <h2>Quick Actions</h2>
                    <ul className="quick-links">
                        <li><Link to="/contact">Contact Support</Link></li>
                        <li><Link to="/about">Our Story</Link></li>
                    </ul>
                </div>
            </div>

            <div className="recent-activity">
                <h2>Recent Activity</h2>
                <div className="activity-placeholder">
                    <p>No recent orders found. Time to grab a coffee!</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
