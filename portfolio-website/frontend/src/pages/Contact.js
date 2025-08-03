import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactInfo = [
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      value: 'john@example.com',
      link: 'mailto:john@example.com'
    },
    {
      icon: 'fas fa-phone',
      title: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Location',
      value: 'San Francisco, CA',
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: 'fab fa-github',
      title: 'GitHub',
      url: 'https://github.com/johndoe'
    },
    {
      icon: 'fab fa-linkedin',
      title: 'LinkedIn',
      url: 'https://linkedin.com/in/johndoe'
    },
    {
      icon: 'fab fa-twitter',
      title: 'Twitter',
      url: 'https://twitter.com/johndoe'
    },
    {
      icon: 'fab fa-instagram',
      title: 'Instagram',
      url: 'https://instagram.com/johndoe'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Try Node.js backend first
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      // Fallback to PHP if Node.js is not available
      try {
        const phpResponse = await fetch('/backend/php/contact.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (phpResponse.ok) {
          setSubmitStatus('success');
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          throw new Error('Failed to send message via PHP');
        }
      } catch (phpError) {
        console.error('Contact form error:', phpError);
        setSubmitStatus('error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact">
      <div className="container">
        <section className="contact-hero section">
          <div className="hero-content fade-in">
            <h1>Get In Touch</h1>
            <p>
              Ready to start your next project? Let's discuss your ideas and 
              turn them into reality. I'm always excited to work on new challenges.
            </p>
          </div>
        </section>

        <section className="contact-content section">
          <div className="contact-grid">
            <div className="contact-info fade-in">
              <h2>Let's Connect</h2>
              <p>
                Feel free to reach out through any of the following channels. 
                I typically respond within 24 hours.
              </p>

              <div className="contact-methods">
                {contactInfo.map((info, index) => (
                  <div key={index} className="contact-method">
                    <div className="method-icon">
                      <i className={info.icon}></i>
                    </div>
                    <div className="method-info">
                      <h4>{info.title}</h4>
                      {info.link ? (
                        <a href={info.link}>{info.value}</a>
                      ) : (
                        <span>{info.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="social-section">
                <h3>Follow Me</h3>
                <div className="social-links">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      title={social.title}
                    >
                      <i className={social.icon}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="contact-form-container fade-in">
              <form className="contact-form" onSubmit={handleSubmit}>
                <h2>Send a Message</h2>
                
                {submitStatus === 'success' && (
                  <div className="alert alert-success">
                    <i className="fas fa-check-circle"></i>
                    Thank you! Your message has been sent successfully.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="alert alert-error">
                    <i className="fas fa-exclamation-circle"></i>
                    Sorry, there was an error sending your message. Please try again.
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={errors.name ? 'error' : ''}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? 'error' : ''}
                      placeholder="Enter your email address"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={errors.subject ? 'error' : ''}
                    placeholder="What's this about?"
                  />
                  {errors.subject && <span className="error-message">{errors.subject}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={errors.message ? 'error' : ''}
                    placeholder="Tell me about your project..."
                    rows="6"
                  ></textarea>
                  {errors.message && <span className="error-message">{errors.message}</span>}
                </div>

                <button 
                  type="submit" 
                  className="btn submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="availability-section section">
          <div className="availability-content fade-in">
            <h2>Availability</h2>
            <div className="availability-grid">
              <div className="availability-card">
                <div className="status-indicator available"></div>
                <h3>Available for New Projects</h3>
                <p>I'm currently accepting new freelance projects and collaborations.</p>
              </div>
              <div className="availability-card">
                <div className="response-time">
                  <i className="fas fa-clock"></i>
                  <span>24 hours</span>
                </div>
                <h3>Response Time</h3>
                <p>I typically respond to all inquiries within 24 hours.</p>
              </div>
              <div className="availability-card">
                <div className="project-timeline">
                  <i className="fas fa-calendar"></i>
                  <span>2-4 weeks</span>
                </div>
                <h3>Project Timeline</h3>
                <p>Most projects can be completed within 2-4 weeks, depending on scope.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;