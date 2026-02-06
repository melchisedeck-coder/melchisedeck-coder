import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Frontend Development',
      description: 'Creating responsive, interactive, and visually appealing user interfaces using modern technologies like React, Vue.js, and Angular.',
      icon: 'fas fa-laptop-code',
      features: ['Responsive Design', 'Modern Frameworks', 'Performance Optimization', 'Cross-browser Compatibility'],
      price: 'Starting at $50/hour',
      popular: false
    },
    {
      id: 2,
      title: 'Full Stack Development',
      description: 'End-to-end web application development from database design to user interface implementation.',
      icon: 'fas fa-layer-group',
      features: ['Complete Web Apps', 'Database Design', 'API Development', 'Deployment & Hosting'],
      price: 'Starting at $75/hour',
      popular: true
    },
    {
      id: 3,
      title: 'Backend Development',
      description: 'Robust server-side applications, APIs, and database solutions using Node.js, PHP, and Python.',
      icon: 'fas fa-server',
      features: ['RESTful APIs', 'Database Integration', 'Authentication Systems', 'Server Management'],
      price: 'Starting at $60/hour',
      popular: false
    },
    {
      id: 4,
      title: 'Website Redesign',
      description: 'Transform your existing website with modern design principles and improved user experience.',
      icon: 'fas fa-paint-brush',
      features: ['Modern UI/UX', 'Mobile Optimization', 'Speed Improvements', 'SEO Enhancement'],
      price: 'Starting at $1,500',
      popular: false
    },
    {
      id: 5,
      title: 'E-Commerce Solutions',
      description: 'Complete online store development with payment integration, inventory management, and admin panels.',
      icon: 'fas fa-shopping-cart',
      features: ['Payment Integration', 'Inventory Management', 'Admin Dashboard', 'Order Processing'],
      price: 'Starting at $2,500',
      popular: false
    },
    {
      id: 6,
      title: 'Consulting & Code Review',
      description: 'Technical consultation, code reviews, and guidance for your development projects.',
      icon: 'fas fa-comments',
      features: ['Code Analysis', 'Architecture Review', 'Performance Audit', 'Best Practices'],
      price: 'Starting at $40/hour',
      popular: false
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Discovery',
      description: 'We discuss your project requirements, goals, and timeline to understand your vision.'
    },
    {
      step: '02',
      title: 'Planning',
      description: 'I create a detailed project plan with wireframes, technology stack, and milestones.'
    },
    {
      step: '03',
      title: 'Development',
      description: 'Building your project with regular updates and communication throughout the process.'
    },
    {
      step: '04',
      title: 'Testing & Launch',
      description: 'Thorough testing, optimization, and deployment of your finished product.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart',
      content: 'John delivered an exceptional e-commerce platform that exceeded our expectations. Professional, reliable, and skilled.',
      rating: 5
    },
    {
      name: 'Mike Chen',
      role: 'Founder, Digital Agency',
      content: 'Outstanding work on our company website. Great communication and attention to detail throughout the project.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director',
      content: 'The website redesign boosted our conversions by 40%. John\'s expertise in both design and development is impressive.',
      rating: 5
    }
  ];

  return (
    <div className="services">
      <div className="container">
        <section className="services-hero section">
          <div className="hero-content fade-in">
            <h1>My Services</h1>
            <p>
              I offer comprehensive web development services to help bring your 
              digital ideas to life. From concept to deployment, I'm here to 
              create exceptional web experiences.
            </p>
          </div>
        </section>

        <section className="services-grid-section section">
          <h2 className="section-title fade-in">What I Offer</h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={service.id} className={`service-card fade-in ${service.popular ? 'popular' : ''}`}>
                {service.popular && <div className="popular-badge">Most Popular</div>}
                <div className="service-icon">
                  <i className={service.icon}></i>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>
                      <i className="fas fa-check"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="service-price">{service.price}</div>
                <Link to="/contact" className="btn service-btn">
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="process-section section">
          <h2 className="section-title fade-in">My Process</h2>
          <div className="process-grid">
            {processSteps.map((step, index) => (
              <div key={index} className="process-step fade-in">
                <div className="step-number">{step.step}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="testimonials-section section">
          <h2 className="section-title fade-in">What Clients Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card fade-in">
                <div className="testimonial-content">
                  <div className="stars">
                    {[...Array(testimonial.rating)].map((_, starIndex) => (
                      <i key={starIndex} className="fas fa-star"></i>
                    ))}
                  </div>
                  <p>"{testimonial.content}"</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-section section">
          <div className="cta-content fade-in">
            <h2>Ready to Start Your Project?</h2>
            <p>
              Let's discuss your ideas and turn them into reality. 
              I'm here to help you build something amazing.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn">
                Start a Project
              </Link>
              <a href="mailto:john@example.com" className="btn btn-outline">
                Email Me
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;