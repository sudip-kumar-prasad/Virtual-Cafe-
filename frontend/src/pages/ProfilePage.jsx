import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './ProfilePage.css';

/** 1. THE MEMBER PROFILE PAGE
 * This page is the "Member Hub" where users can see their own details 
 * and their previous order history in one place.
 */
const ProfilePage = () => {
    const { user } = useAuth(); // Get current logged-in user info
    const { addToCart } = useCart(); // Get cart functions
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [points, setPoints] = useState(0);       // Available Balance

    // REWARD TIERS CONFIG
    const REWARD_TIERS = [
        { id: 'reward-muffin-50', name: 'Free Muffin', cost: 50, image: '/assets/menu/muffin-reward.png' },
        { id: 'reward-oasis-roast-100', name: 'Free Oasis Roast', cost: 100, image: '/assets/menu/roast-reward.png' },
        { id: 'reward-latte-150', name: 'Free Sig. Latte', cost: 150, image: '/assets/menu/latte-reward.png' }
    ];

    // Fetch order history on mount
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await apiService.getMyOrders();
                if (response.success) {
                    const fetchedOrders = response.data;
                    setOrders(fetchedOrders);

                    /** DYNAMIC POINTS CALCULATION
                     * Total Earned = Sum of totalAmount (1 pt per $1)
                     * Total Spent = Sum of pointsUsed
                     * Balance = Earned - Spent
                     */
                    const earned = fetchedOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
                    const spent = fetchedOrders.reduce((sum, order) => sum + (order.pointsUsed || 0), 0);

                    setPoints(Math.floor(earned) - spent);
                }
            } catch (err) {
                console.error('Error fetching history:', err);
                setError(err.message || 'Failed to load order history');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);



    const getStatusColor = (status) => {
        const s = status ? status.toLowerCase() : 'pending';
        switch (s) {
            case 'pending': return '#FFA500';
            case 'preparing': return '#2196F3';
            case 'completed': return '#4CAF50';
            case 'cancelled': return '#F44336';
            default: return '#3e2723';
        }
    };

    const handleClaimReward = (tier) => {
        /** ADDING TO CART
         * We create a special "Reward Item" with price $0.
         */
        const rewardItem = {
            id: tier.id,
            name: `🎁 ${tier.name}`,
            price: 0,
            image: '/assets/menu/reward-generic.png', // Placeholder image
            category: 'Reward'
        };

        addToCart(rewardItem);
        alert(`🎉 Congratulations! Your ${tier.name} has been added to your cart. Proceed to checkout!`);
    };

    return (
        <div className="profile-page-wrapper">
            <div className="container">

                {/* SECTION 1: USER ACCOUNT INFO */}
                <header className="profile-header">
                    <div className="profile-badge-large">
                        {user ? user.name.charAt(0).toUpperCase() : 'M'}
                    </div>
                    <div className="profile-user-info">
                        <h1>{user ? user.name : 'Member'}</h1>
                        <p className="profile-email">{user ? user.email : 'member@cafeoasis.com'}</p>
                        <span className="member-tier-badge">Gold Member</span>
                    </div>
                </header>

                <div className="profile-main-grid">

                    {/* LEFT COLUMN: ACCOUNT DETAILS & REWARDS */}
                    <aside className="profile-sidebar">
                        {/* LOYALTY CARD */}
                        <div className="sidebar-card loyalty-card">
                            <h3>Loyalty Rewards</h3>
                            <div className="points-display">
                                <span className="points-number">{points}</span>
                                <span className="points-label">Available Points</span>
                            </div>

                            <div className="rewards-menu">
                                {REWARD_TIERS.map(tier => (
                                    <div key={tier.id} className={`reward-tier-item ${points >= tier.cost ? 'unlocked' : 'locked'}`}>
                                        <div className="tier-info">
                                            <h4>{tier.name}</h4>
                                            <span className="cost-badge">{tier.cost} pts</span>
                                        </div>
                                        <button
                                            className="claim-mini-btn"
                                            disabled={points < tier.cost}
                                            onClick={() => handleClaimReward(tier)}
                                        >
                                            {points >= tier.cost ? 'Claim' : 'Locked'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="sidebar-card">
                            <h3>Account Overview</h3>
                            <div className="stat-item">
                                <span className="label">Member Since</span>
                                <span className="value">Jan 2026</span>
                            </div>
                            <div className="stat-item">
                                <span className="label">Total Orders</span>
                                <span className="value">{orders.length}</span>
                            </div>
                        </div>
                    </aside>

                    {/* RIGHT COLUMN: ORDER HISTORY */}
                    <main className="profile-content">
                        <h2 className="section-title-inline">Order History</h2>

                        {loading ? (
                            <div className="profile-status-box">
                                <div className="loader"></div>
                                <p>Loading history...</p>
                            </div>
                        ) : error ? (
                            <div className="profile-status-box error">
                                <p>{error}</p>
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="profile-status-box empty">
                                <p>You haven't placed any orders yet.</p>
                                <Link to="/menu" className="btn">Start Ordering</Link>
                            </div>
                        ) : (
                            <div className="profile-orders-list">
                                {orders.map(order => (
                                    <div key={order._id || order.id} className="profile-order-card">
                                        <div className="order-header-row">
                                            <div className="order-meta">
                                                <h4>Order #{order.orderNumber || (order._id || order.id).substring(0, 8)}</h4>
                                                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <div
                                                className="status-pill"
                                                style={{ color: getStatusColor(order.status), borderColor: getStatusColor(order.status) }}
                                            >
                                                {order.status.toUpperCase()}
                                            </div>
                                        </div>
                                        <div className="order-body-row">
                                            <ul className="order-items-minimal">
                                                {order.items.map((item, idx) => (
                                                    <li key={idx}>{item.quantity}x {item.name}</li>
                                                ))}
                                            </ul>
                                            <div className="order-total-minimal">
                                                Total: <span>${order.totalAmount.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
