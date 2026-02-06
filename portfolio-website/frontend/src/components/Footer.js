import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/services', label: 'Services' },
    { path: '/contact', label: 'Contact' }
  ];

  const socialLinks = [
    { icon: 'fab fa-github', url: 'https://github.com/johndoe', label: 'GitHub' },
    { icon: 'fab fa-linkedin', url: 'https://linkedin.com/in/johndoe', label: 'LinkedIn' },
    { icon: 'fab fa-twitter', url: 'https://twitter.com/johndoe', label: 'Twitter' },
    { icon: 'fas fa-envelope', url: 'mailto:john@example.com', label: 'Email' }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <Link to="/">
                <span>JD</span>
              </Link>
            </div>
            <p>
              Full Stack Developer passionate about creating exceptional 
              web experiences and solving complex problems with clean, 
              efficient code.
            </p>
            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="social-link"
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3>Services</h3>
            <ul className="footer-links">
              <li><a href="/services">Frontend Development</a></li>
              <li><a href="/services">Backend Development</a></li>
              <li><a href="/services">Full Stack Development</a></li>
              <li><a href="/services">Website Redesign</a></li>
              <li><a href="/services">Consulting</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Get In Touch</h3>
            <div className="footer-contact">
              <p>
                <i className="fas fa-envelope"></i>
                <a href="mailto:john@example.com">john@example.com</a>
              </p>
              <p>
                <i className="fas fa-phone"></i>
                <a href="tel:+15551234567">+1 (555) 123-4567</a>
              </p>
              <p>
                <i className="fas fa-map-marker-alt"></i>
                <span>San Francisco, CA</span>
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} John Doe. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;