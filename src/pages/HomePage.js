import React from 'react';
import { Link } from 'react-router-dom';
import menuItems from '../data/menuData';

const HomePage = () => {
  // Get some featured items (first 3 items from each category)
  const getCategoryItems = (category) => {
    return menuItems.filter(item => item.category === category).slice(0, 3);
  };

  const featuredCoffee = getCategoryItems('coffee');
  const featuredPastries = getCategoryItems('pastry');
  
  return (
    <div style={{ position: 'relative' }}>
      {/* Hero Section */}
      <section className="hero" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1957&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        padding: 'var(--spacing-xxl) var(--spacing-lg)',
        margin: 0,
        overflow: 'hidden'
      }}>
        <div className="hero-content" style={{ 
          maxWidth: '800px',
          position: 'relative',
          zIndex: 2
        }}>
          <h1 style={{ 
            color: 'white', 
            marginBottom: 'var(--spacing-lg)',
            fontSize: '3.5rem',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
          }}>Welcome to Café Oasis</h1>
          <p style={{ 
            fontSize: '1.4rem', 
            marginBottom: 'var(--spacing-xl)',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
          }}>Experience the joy of café life from anywhere. Fresh coffee, delicious food, cozy atmosphere.</p>
          <Link to="/menu" className="btn" style={{ 
            backgroundColor: 'var(--primary)',
            color: 'white',
            padding: 'var(--spacing-md) var(--spacing-xl)',
            fontSize: '1.2rem',
            textDecoration: 'none',
            borderRadius: 'var(--radius-md)',
            transition: 'background-color var(--transition-fast)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>View Our Menu</Link>
        </div>
      </section>

      {/* Content Container */}
      <div style={{ 
        position: 'relative',
        backgroundColor: 'white',
        zIndex: 2
      }}>
        {/* Featured Coffee */}
        <section className="section" style={{ padding: 'var(--spacing-xxl) 0' }}>
          <div className="container">
            <h2 className="section-title">Featured Coffee</h2>
            <div className="menu-grid">
              {featuredCoffee.map(item => (
                <div key={item.id} className="menu-item">
                  <div className="menu-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="menu-item-content">
                    <h3 className="menu-item-title">{item.name}</h3>
                    <div className="menu-item-price">${item.price.toFixed(2)}</div>
                    <p className="menu-item-desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex-center" style={{ marginTop: 'var(--spacing-lg)' }}>
              <Link to="/menu" className="btn">See All Coffee</Link>
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section className="section" style={{ 
          backgroundColor: 'var(--secondary)',
          padding: 'var(--spacing-xxl) 0'
        }}>
          <div className="container">
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              alignItems: 'center', 
              gap: 'var(--spacing-xl)',
              background: 'var(--white)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--spacing-xl)',
              boxShadow: '0 4px 6px var(--shadow)'
            }}>
              <div style={{ flex: '1 1 400px' }}>
                <h2 style={{ 
                  fontSize: '2.5rem',
                  marginBottom: 'var(--spacing-md)',
                  color: 'var(--primary-dark)'
                }}>Our Story</h2>
                <p style={{ 
                  fontSize: '1.1rem',
                  lineHeight: '1.8',
                  color: 'var(--text-dark)',
                  marginBottom: 'var(--spacing-md)'
                }}>Café Oasis started with a simple vision: to bring the cozy, inviting atmosphere of a neighborhood café to the digital world. We believe that enjoying quality coffee and food shouldn't be limited by location.</p>
                <p style={{ 
                  fontSize: '1.1rem',
                  lineHeight: '1.8',
                  color: 'var(--text-dark)',
                  marginBottom: 'var(--spacing-lg)'
                }}>Our team of baristas and chefs are committed to crafting the perfect café experience for you. Each item on our menu is carefully selected and prepared to ensure maximum enjoyment.</p>
                <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                  <Link to="/about" className="btn" style={{
                    padding: 'var(--spacing-md) var(--spacing-xl)',
                    fontSize: '1.1rem'
                  }}>Learn More About Us</Link>
                </div>
              </div>
              <div style={{ 
                flex: '1 1 400px',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: '0 6px 12px var(--shadow)'
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&h=600" 
                  alt="Café barista preparing coffee" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform var(--transition)',
                    transform: 'scale(1.02)'
                  }}
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Pastries */}
        <section className="section" style={{ padding: 'var(--spacing-xxl) 0' }}>
          <div className="container">
            <h2 className="section-title">Fresh Pastries</h2>
            <div className="menu-grid">
              {featuredPastries.map(item => (
                <div key={item.id} className="menu-item">
                  <div className="menu-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="menu-item-content">
                    <h3 className="menu-item-title">{item.name}</h3>
                    <div className="menu-item-price">${item.price.toFixed(2)}</div>
                    <p className="menu-item-desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex-center" style={{ marginTop: 'var(--spacing-lg)' }}>
              <Link to="/menu" className="btn">See All Pastries</Link>
            </div>
          </div>
        </section>
        
        {/* Customer Testimonials */}
        <section className="section" style={{ 
          backgroundColor: 'var(--secondary)',
          padding: 'var(--spacing-xxl) 0'
        }}>
          <div className="container">
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>What Our Customers Say</h2>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--spacing-xl)',
              marginTop: 'var(--spacing-lg)'
            }}>
              {/* Testimonial 1 */}
              <div style={{
                backgroundColor: 'var(--white)',
                padding: 'var(--spacing-xl)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 4px 6px var(--shadow)'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: 'var(--spacing-md)'
                }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '50%', 
                    overflow: 'hidden',
                    marginRight: 'var(--spacing-md)'
                  }}>
                    <img 
                      src="https://randomuser.me/api/portraits/women/44.jpg" 
                      alt="Customer" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <h3 style={{ margin: 0 }}>Sarah Johnson</h3>
                    <div style={{ color: 'var(--primary)' }}>★★★★★</div>
                  </div>
                </div>
                <p style={{ 
                  fontStyle: 'italic',
                  lineHeight: '1.6',
                  color: 'var(--text-dark)'
                }}>
                  "The coffee here is absolutely amazing! The atmosphere is so cozy and the staff is incredibly friendly. It's become my favorite spot to work and relax."
                </p>
              </div>

              {/* Testimonial 2 */}
              <div style={{
                backgroundColor: 'var(--white)',
                padding: 'var(--spacing-xl)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 4px 6px var(--shadow)'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: 'var(--spacing-md)'
                }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '50%', 
                    overflow: 'hidden',
                    marginRight: 'var(--spacing-md)'
                  }}>
                    <img 
                      src="https://randomuser.me/api/portraits/men/32.jpg" 
                      alt="Customer" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <h3 style={{ margin: 0 }}>Michael Chen</h3>
                    <div style={{ color: 'var(--primary)' }}>★★★★★</div>
                  </div>
                </div>
                <p style={{ 
                  fontStyle: 'italic',
                  lineHeight: '1.6',
                  color: 'var(--text-dark)'
                }}>
                  "The pastries are to die for! I love how they're always fresh and the selection changes daily. The virtual café experience is surprisingly authentic."
                </p>
              </div>

              {/* Testimonial 3 */}
              <div style={{
                backgroundColor: 'var(--white)',
                padding: 'var(--spacing-xl)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 4px 6px var(--shadow)'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: 'var(--spacing-md)'
                }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '50%', 
                    overflow: 'hidden',
                    marginRight: 'var(--spacing-md)'
                  }}>
                    <img 
                      src="https://randomuser.me/api/portraits/women/68.jpg" 
                      alt="Customer" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <h3 style={{ margin: 0 }}>Emily Rodriguez</h3>
                    <div style={{ color: 'var(--primary)' }}>★★★★★</div>
                  </div>
                </div>
                <p style={{ 
                  fontStyle: 'italic',
                  lineHeight: '1.6',
                  color: 'var(--text-dark)'
                }}>
                  "I love the convenience of ordering from home while still getting that café-quality experience. The delivery is always prompt and the food is always fresh."
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="section" style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://source.unsplash.com/featured/?coffeeshop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'var(--white)',
          textAlign: 'center',
          padding: 'var(--spacing-xxl) 0'
        }}>
          <div className="container">
            <h2 style={{ color: 'var(--white)' }}>Ready to Order?</h2>
            <p style={{ marginBottom: 'var(--spacing-lg)' }}>Experience Oasis Café today. Your favorite drinks and treats are just a click away.</p>
            <Link to="/menu" className="btn">Order Now</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
