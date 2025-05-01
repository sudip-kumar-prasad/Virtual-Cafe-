import React from 'react';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Amelia Grace',
      role: 'Head Barista',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&h=400',
      description: 'Coffee artisan with 8 years of experience in specialty coffee.'
    },
    {
      name: 'Taylor Brown',
      role: 'Café Manager',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400',
      description: 'Dedicated to creating the perfect café experience for every guest.'
    },
    {
      name: 'Jamie Smith',
      role: 'Executive Chef',
      image: 'https://images.unsplash.com/photo-1600878459138-e1123b37cb30?auto=format&fit=crop&w=400&h=400',
      description: 'Culinary expert specializing in artisanal pastries and café cuisine.'
    }
  ];

  return (
    <div className="section" style={{ padding: '4rem 0' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 className="section-title" style={{ 
          textAlign: 'center',
          marginBottom: '3rem',
          position: 'relative',
          paddingBottom: '1rem'
        }}>
          About Oasis Café
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '4px',
            borderRadius: '2px'
          }}></div>
        </h1>
        
        <div className="about-container" style={{ 
          maxWidth: '1000px', 
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          {/* Intro Section */}
          <div className="card" style={{ 
            marginBottom: '4rem',
            padding: '2.5rem',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
            border: '1px solid rgba(0,0,0,0.05)'
          }}>
            <h2 style={{ 
              marginTop: 0,
              fontSize: '2rem',
              marginBottom: '1.5rem'
            }}>Our Story</h2>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              marginBottom: '1rem'
            }}>Oasis Café was founded in 2025 with a simple mission: to bring the joy and comfort of café culture to the digital world. In an era where virtual experiences are becoming increasingly important, we wanted to create a space where people could enjoy quality coffee and food, regardless of their physical location.</p>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8'
            }}>Our team consists of passionate coffee enthusiasts, skilled baristas, and tech experts who work together to create an authentic café experience online.</p>
          </div>
          
          {/* Vision & Mission */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            <div className="card" style={{
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              border: '1px solid rgba(0,0,0,0.05)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer',
              ':hover': {
                transform: 'translateY(-5px)'
              }
            }}>
              <h3 style={{ 
                marginTop: 0,
                fontSize: '1.5rem',
                marginBottom: '1rem'
              }}>Our Vision</h3>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.8'
              }}>To be the leading café, bringing people together through shared love of quality coffee and food, regardless of physical boundaries.</p>
            </div>
            
            <div className="card" style={{
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              border: '1px solid rgba(0,0,0,0.05)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer',
              ':hover': {
                transform: 'translateY(-5px)'
              }
            }}>
              <h3 style={{ 
                marginTop: 0,
                fontSize: '1.5rem',
                marginBottom: '1rem'
              }}>Our Mission</h3>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.8'
              }}>To create an authentic café experience online, offering quality products and fostering a sense of community in the digital space.</p>
            </div>
          </div>
          
          {/* Values */}
          <div className="card" style={{ 
            marginBottom: '4rem',
            padding: '2.5rem',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
            border: '1px solid rgba(0,0,0,0.05)'
          }}>
            <h2 style={{ 
              marginTop: 0,
              fontSize: '2rem',
              textAlign: 'center',
              marginBottom: '2.5rem'
            }}>Our Values</h2>
            
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
              marginTop: '1.5rem'
            }}>
              <div style={{ 
                textAlign: 'center',
                padding: '1.5rem',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                ':hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                }
              }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  marginBottom: '0.5rem'
                }}>Quality</h3>
                <p style={{
                  lineHeight: '1.6'
                }}>We never compromise on the quality of our products and experiences.</p>
              </div>
              
              <div style={{ 
                textAlign: 'center',
                padding: '1.5rem',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                ':hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                }
              }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  marginBottom: '0.5rem'
                }}>Community</h3>
                <p style={{
                  lineHeight: '1.6'
                }}>We believe in fostering connections and creating a welcoming space for all.</p>
              </div>
              
              <div style={{ 
                textAlign: 'center',
                padding: '1.5rem',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                ':hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                }
              }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  marginBottom: '0.5rem'
                }}>Innovation</h3>
                <p style={{
                  lineHeight: '1.6'
                }}>We constantly seek new ways to improve and enhance the café experience.</p>
              </div>
              
              <div style={{ 
                textAlign: 'center',
                padding: '1.5rem',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                ':hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                }
              }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  marginBottom: '0.5rem'
                }}>Sustainability</h3>
                <p style={{
                  lineHeight: '1.6'
                }}>We are committed to ethical sourcing and environmentally friendly practices.</p>
              </div>
            </div>
          </div>
          
          {/* Team */}
          <div className="card" style={{ 
            marginBottom: '4rem',
            padding: '2.5rem',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
            border: '1px solid rgba(0,0,0,0.05)'
          }}>
            <h2 style={{ 
              marginTop: 0,
              fontSize: '2rem',
              textAlign: 'center',
              marginBottom: '2.5rem'
            }}>Meet Our Team</h2>
            
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
              marginTop: '1.5rem'
            }}>
              {teamMembers.map((member, index) => (
                <div key={index} style={{ 
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  ':hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                  }
                }}>
                  <div style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    margin: '0 auto 1rem',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease',
                    border: '4px solid'
                  }}>
                    <img 
                      src={member.image} 
                      alt={member.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                      }}
                      onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                      onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    />
                  </div>
                  <h3 style={{ 
                    fontSize: '1.3rem',
                    marginBottom: '0.25rem'
                  }}>{member.name}</h3>
                  <div style={{
                    fontWeight: '600',
                    fontSize: '1.1rem',
                    marginBottom: '0.5rem'
                  }}>{member.role}</div>
                  <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    maxWidth: '250px',
                    margin: '0 auto'
                  }}>{member.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Contact */}
          <div className="card" style={{ 
            padding: '2.5rem',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
            border: '1px solid rgba(0,0,0,0.05)'
          }}>
            <h2 style={{ 
              marginTop: 0,
              fontSize: '2rem',
              textAlign: 'center',
              marginBottom: '1.5rem'
            }}>Contact Us</h2>
            <p style={{
              textAlign: 'center',
              marginBottom: '2.5rem',
              fontSize: '1.1rem',
              lineHeight: '1.8',
              maxWidth: '600px',
              margin: '0 auto 2.5rem'
            }}>We'd love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to get in touch with us.</p>
            
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
              padding: '0 1rem'
            }}>
              <div style={{
                textAlign: 'center',
                padding: '1.5rem',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                ':hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                }
              }}>
                <h3 style={{ 
                  fontSize: '1.3rem',
                  marginBottom: '1rem'
                }}>Address</h3>
                <p style={{ 
                  margin: '0.5rem 0',
                  lineHeight: '1.6'
                }}>123 Coffee Street<br />Café Town, CT 12345</p>
              </div>
              
              <div style={{
                textAlign: 'center',
                padding: '1.5rem',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                ':hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                }
              }}>
                <h3 style={{ 
                  fontSize: '1.3rem',
                  marginBottom: '1rem'
                }}>Contact</h3>
                <p style={{ 
                  margin: '0.5rem 0',
                  lineHeight: '1.6'
                }}>Phone: (123) 456-7890<br />Email: info@virtualcafe.com</p>
              </div>
              
              <div style={{
                textAlign: 'center',
                padding: '1.5rem',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                ':hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                }
              }}>
                <h3 style={{ 
                  fontSize: '1.3rem',
                  marginBottom: '1rem'
                }}>Hours</h3>
                <p style={{ 
                  margin: '0.5rem 0',
                  lineHeight: '1.6'
                }}>Mon - Fri: 7am - 7pm<br />Sat: 8am - 8pm<br />Sun: 8am - 3pm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
