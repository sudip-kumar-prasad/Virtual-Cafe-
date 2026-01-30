import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
    const { user } = useAuth();
    const firstName = user ? user.name.split(' ')[0] : 'Guest';

    // Use a state to trigger a simple fade-in effect on mount
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true);
    }, []);

    // Inline styles for specific dashboard elements
    // Note: For a larger app, we'd move this to a CSS module or scss file
    const styles = {
        dashboardContainer: {
            paddingBottom: '4rem',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.8s ease-out',
        },
        heroSection: {
            background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)',
            borderRadius: 'var(--radius-lg)',
            padding: '4rem 2rem',
            color: 'white',
            marginBottom: '3rem',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 10px 25px -5px rgba(139, 69, 19, 0.4)',
            textAlign: 'center',
        },
        heroOverlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")',
            opacity: 0.1,
        },
        heroContent: {
            position: 'relative',
            zIndex: 1,
            maxWidth: '800px',
            margin: '0 auto',
        },
        greeting: {
            fontSize: '3rem',
            fontWeight: 700,
            marginBottom: '1rem',
            fontFamily: "'Playfair Display', serif",
            letterSpacing: '-0.5px',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)'
        },
        subGreeting: {
            fontSize: '1.2rem',
            opacity: 0.9,
            fontWeight: 300,
            maxWidth: '600px',
            margin: '0 auto',
        },
        sectionTitle: {
            fontSize: '1.8rem',
            marginBottom: '1.5rem',
            color: 'var(--text-dark)',
            borderLeft: '4px solid var(--primary)',
            paddingLeft: '1rem',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem',
        },
        card: {
            backgroundColor: 'white',
            borderRadius: 'var(--radius-lg)',
            padding: '2.5rem',
            boxShadow: '0 4px 6px var(--shadow), 0 10px 15px -3px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease',
            cursor: 'pointer',
            textDecoration: 'none',
            color: 'inherit',
            border: '1px solid rgba(0,0,0,0.05)',
            height: '100%',
        },
        cardIcon: {
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: 'var(--secondary-light)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            marginBottom: '1.5rem',
            transition: 'background-color 0.3s ease, color 0.3s ease',
        },
        cardTitle: {
            fontSize: '1.4rem',
            fontWeight: 'bold',
            marginBottom: '0.75rem',
            color: 'var(--text-dark)',
        },
        cardDesc: {
            color: 'var(--text-light)',
            marginBottom: '2rem',
            lineHeight: 1.6,
            flexGrow: 1,
        },
        cardAction: {
            marginTop: 'auto',
            color: 'var(--primary)',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.95rem',
        },
        arrow: {
            marginLeft: '0.5rem',
            transition: 'transform 0.2s ease',
        },
        statsRow: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem',
        },
        statCard: {
            backgroundColor: 'var(--white)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 2px 4px var(--shadow)',
            display: 'flex',
            alignItems: 'center',
            borderLeft: '4px solid var(--accent)',
        },
        statNumber: {
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: 'var(--text-dark)',
            lineHeight: 1,
        },
        statLabel: {
            fontSize: '0.9rem',
            color: 'var(--text-light)',
            marginLeft: '1rem',
        }
    };

    return (
        <div className="section" style={{ paddingTop: '2rem', minHeight: '80vh' }}>
            <div className="container" style={styles.dashboardContainer}>

                {/* Premium Hero Section */}
                <div style={styles.heroSection}>
                    <div style={styles.heroOverlay}></div>
                    <div style={styles.heroContent}>
                        <h1 style={styles.greeting}>Good Afternoon, {firstName}</h1>
                        <p style={styles.subGreeting}>
                            Your personal coffee sanctuary is ready. We've got fresh beans roasting and pastries baking just for you.
                        </p>
                    </div>
                </div>

                {/* Quick Stats (Mock Data) */}
                <div style={styles.statsRow}>
                    <div style={styles.statCard}>
                        <div style={{ ...styles.statNumber, color: 'var(--primary)' }}>0</div>
                        <div style={styles.statLabel}>Active Orders</div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={{ ...styles.statNumber, color: 'var(--accent)' }}>0</div>
                        <div style={styles.statLabel}>Reward Points</div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={{ ...styles.statNumber, color: '#4CAF50' }}>Member</div>
                        <div style={styles.statLabel}>Status Tier</div>
                    </div>
                </div>

                {/* Main Actions Grid */}
                <h2 style={styles.sectionTitle}>Quick Actions</h2>
                <div style={styles.grid}>
                    {/* Order Card */}
                    <Link
                        to="/menu"
                        style={styles.card}
                        className="dashboard-card-hover"
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-8px)';
                            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)';
                            e.currentTarget.querySelector('.card-icon').style.backgroundColor = 'var(--primary)';
                            e.currentTarget.querySelector('.card-icon').style.color = 'white';
                            e.currentTarget.querySelector('.arrow-icon').style.transform = 'translateX(5px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 6px var(--shadow), 0 10px 15px -3px rgba(0,0,0,0.05)';
                            e.currentTarget.querySelector('.card-icon').style.backgroundColor = 'var(--secondary-light)';
                            e.currentTarget.querySelector('.card-icon').style.color = 'var(--primary)';
                            e.currentTarget.querySelector('.arrow-icon').style.transform = 'translateX(0)';
                        }}
                    >
                        <div style={styles.cardIcon} className="card-icon">☕</div>
                        <h3 style={styles.cardTitle}>Order Online</h3>
                        <p style={styles.cardDesc}>Browse our full menu of artisanal coffees, teas, and fresh pastries. Order for pickup or delivery.</p>
                        <div style={styles.cardAction}>Start Order <span style={styles.arrow} className="arrow-icon">→</span></div>
                    </Link>

                    {/* Cart Card */}
                    <Link
                        to="/cart"
                        style={styles.card}
                        className="dashboard-card-hover"
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-8px)';
                            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)';
                            e.currentTarget.querySelector('.card-icon').style.backgroundColor = 'var(--primary)';
                            e.currentTarget.querySelector('.card-icon').style.color = 'white';
                            e.currentTarget.querySelector('.arrow-icon').style.transform = 'translateX(5px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 6px var(--shadow), 0 10px 15px -3px rgba(0,0,0,0.05)';
                            e.currentTarget.querySelector('.card-icon').style.backgroundColor = 'var(--secondary-light)';
                            e.currentTarget.querySelector('.card-icon').style.color = 'var(--primary)';
                            e.currentTarget.querySelector('.arrow-icon').style.transform = 'translateX(0)';
                        }}
                    >
                        <div style={styles.cardIcon} className="card-icon">🛍️</div>
                        <h3 style={styles.cardTitle}>View Cart</h3>
                        <p style={styles.cardDesc}>Ready to checkout? Review your selected items and complete your purchase securely.</p>
                        <div style={styles.cardAction}>Go to Cart <span style={styles.arrow} className="arrow-icon">→</span></div>
                    </Link>

                    {/* Profile/Contact Card */}
                    <Link
                        to="/contact"
                        style={styles.card}
                        className="dashboard-card-hover"
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-8px)';
                            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)';
                            e.currentTarget.querySelector('.card-icon').style.backgroundColor = 'var(--primary)';
                            e.currentTarget.querySelector('.card-icon').style.color = 'white';
                            e.currentTarget.querySelector('.arrow-icon').style.transform = 'translateX(5px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 6px var(--shadow), 0 10px 15px -3px rgba(0,0,0,0.05)';
                            e.currentTarget.querySelector('.card-icon').style.backgroundColor = 'var(--secondary-light)';
                            e.currentTarget.querySelector('.card-icon').style.color = 'var(--primary)';
                            e.currentTarget.querySelector('.arrow-icon').style.transform = 'translateX(0)';
                        }}
                    >
                        <div style={styles.cardIcon} className="card-icon">👤</div>
                        <h3 style={styles.cardTitle}>Support & Profile</h3>
                        <p style={styles.cardDesc}>Need help with an order? Contact our support team or update your profile settings.</p>
                        <div style={styles.cardAction}>Get Help <span style={styles.arrow} className="arrow-icon">→</span></div>
                    </Link>
                </div>

                {/* Featured Promotion Banner */}
                <div style={{
                    position: 'relative',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    height: '350px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                }}>
                    <img
                        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3"
                        alt="Coffee Brewing"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 10s linear',
                        }}
                    />
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '4rem',
                    }}>
                        <div style={{ maxWidth: '500px', color: 'white' }}>
                            <span style={{
                                backgroundColor: 'var(--accent)',
                                padding: '0.4rem 0.8rem',
                                borderRadius: '50px',
                                fontSize: '0.8rem',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                marginBottom: '1rem',
                                display: 'inline-block'
                            }}>New Arrival</span>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>Ethiopian Yirgacheffe</h2>
                            <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.9 }}>
                                Experience the bright, floral notes of our newest single-origin roast. Perfect for your morning ritual.
                            </p>
                            <Link to="/menu" className="btn" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Order a Cup</Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardPage;
