import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../components/ui/input';
import Button from '../components/ui/button';
import './ContactPage.css';

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1 className="page-title">Contact Us</h1>
        <div className="contact-grid">
          {/* Contact Information Section */}
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <div className="info-section">
              <h3>Address</h3>
              <p>123 Coffee Street</p>
              <p>Café Town, CT 12345</p>
            </div>
            
            <div className="info-section">
              <h3>Contact</h3>
              <p>Phone: (123) 456-7890</p>
              <p>Email: info@oasiscafe.com</p>
            </div>
            
            <div className="info-section">
              <h3>Hours</h3>
              <p>Monday - Friday: 7am - 7pm</p>
              <p>Saturday: 8am - 8pm</p>
              <p>Sunday: 8am - 3pm</p>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="contact-form-container">
            <h2>Send us a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
              {submitSuccess && (
                <div className="success-message">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}
              
              <div className="form-field">
                <label>Name*</label>
                <Input
                  {...register('name', { required: 'Name is required' })}
                  error={errors.name?.message}
                  placeholder="Your name"
                />
              </div>

              <div className="form-field">
                <label>Email*</label>
                <Input
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  error={errors.email?.message}
                  placeholder="Your email"
                />
              </div>

              <div className="form-field">
                <label>Subject*</label>
                <Input
                  {...register('subject', { required: 'Subject is required' })}
                  error={errors.subject?.message}
                  placeholder="Message subject"
                />
              </div>

              <div className="form-field">
                <label>Message*</label>
                <textarea
                  {...register('message', { required: 'Message is required' })}
                  className={errors.message ? 'error' : ''}
                  placeholder="Your message"
                  rows="5"
                />
                {errors.message && (
                  <span className="error-message">{errors.message.message}</span>
                )}
              </div>

              <Button
                type="submit"
                variant="default"
                isLoading={isSubmitting}
                className="submit-button"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 