import React from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api';

/** 1. AUTH CONNECTION
 * We import the 'useAuth' hook so we can greet the user by name.
 * It's like checking the user's ID card when they enter the cafe!
 */
import { useAuth } from '../context/AuthContext';

/** 2. STYLING
 * This file contains all our professional Cafe Oasis designs.
 */
import './DashboardPage.css';

/** 3. THE DASHBOARD COMPONENT
 * Think of this as the "Member Lobby" where users can see their status.
 */
const DashboardPage = () => {
    // We get the user data from our global Auth system
    const { user } = useAuth();

    const [points, setPoints] = React.useState(0);
    const [loading, setLoading] = React.useState(true);

    // Fetch orders to calculate dynamic points
    React.useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await apiService.getMyOrders();
                if (response.success) {
                    const fetchedOrders = response.data;

                    const earned = fetchedOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
                    const spent = fetchedOrders.reduce((sum, order) => sum + (order.pointsUsed || 0), 0);
                    setPoints(Math.floor(earned) - spent);
                }
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    // A friendly way to get just the first name (e.g., "Good morning, Sudip")
    const firstName = user ? user.name.split(' ')[0] : 'Member';

    /** RENDERING (THE JSX)
     * The page is organized into sections for easy reading by both users and developers.
     */
    return (
        <div className="dashboard-page-wrapper">

            {/* SECTION 1: THE WELCOME HERO 
          We use a powerful visual and a warm greeting here.
      */}
            <header className="dashboard-hero-container">
                <img
                    src="/assets/dashboard-hero.png"
                    alt="Warm cafe interior"
                    className="hero-background-image"
                />
                <div className="hero-text-overlay">
                    <h1>Welcome back, {firstName}</h1>
                    <p>The beans are roasted and the water is at the perfect temperature. Your Oasis awaits.</p>
                </div>
            </header>

            {/* SECTION 2: MAIN CONTENT GRID 
          We split the screen: 2/3 for Member info, 1/3 for Activity Sidebar.
      */}
            <div className="dashboard-content-grid">

                {/* LEFT AREA: Profile & Quick Actions */}
                <main className="dashboard-main-area">

                    {/* MEMBERSHIP STATUS CARD */}
                    <div className="membership-card">
                        <img
                            src="/assets/loyalty-badge.png"
                            alt="Loyalty Badge"
                            className="reward-badge-img"
                        />
                        <div className="membership-details">
                            <h2>Gold Member Status</h2>
                            <p>You have earned <span className="points-count">{loading ? '...' : points}</span> Oasis Points</p>
                            <small>
                                {points >= 100
                                    ? "🎉 Reward Unlocked! Head to Profile to claim."
                                    : `Only ${100 - points} points until your next free roast!`}
                            </small>
                        </div>
                    </div>

                    <h2 className="section-title">Quick Actions</h2>

                    {/* ACTION BUTTON TILES */}
                    <div className="actions-container">
                        <Link to="/menu" className="quick-action-link">
                            <span className="action-icon">☕</span>
                            <h3>New Order</h3>
                            <p>Browse our fresh roasts and delicious pastries.</p>
                        </Link>

                        <Link to="/cart" className="quick-action-link">
                            <span className="action-icon">🛍️</span>
                            <h3>Checkout</h3>
                            <p>Ready to wrap up? Go to your cart to finish your order.</p>
                        </Link>

                        <Link to="/contact" className="quick-action-link">
                            <span className="action-icon">👤</span>
                            <h3>Support</h3>
                            <p>Questions about an order? We're here to help.</p>
                        </Link>
                    </div>
                </main>

                {/* RIGHT AREA: THE SIDEBAR 
            Displays mock activity to show how a real system works.
        */}
                <aside className="activity-sidebar">
                    <h2>Recent Orders</h2>

                    <div className="activity-list">
                        <div className="activity-item">
                            <div className="info">
                                <h4>Caramel Macchiato</h4>
                                <span>Feb 05, 2026</span>
                            </div>
                            <div className="activity-status">Completed</div>
                        </div>

                        <div className="activity-item">
                            <div className="info">
                                <h4>Blueberry Muffin</h4>
                                <span>Feb 03, 2026</span>
                            </div>
                            <div className="activity-status">Completed</div>
                        </div>

                        <div className="activity-item">
                            <div className="info">
                                <h4>Cold Brew</h4>
                                <span>Jan 30, 2026</span>
                            </div>
                            <div className="activity-status">Completed</div>
                        </div>
                    </div>

                    <Link to="/profile" className="view-all-link">View My Profile & History →</Link>
                </aside>

            </div>
        </div>
    );
};

export default DashboardPage;
