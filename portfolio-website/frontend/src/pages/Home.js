import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content fade-in">
            <div className="hero-text">
              <h1>
                Hi, I'm <span className="highlight">John Doe</span>
              </h1>
              <h2>Full Stack Developer & UI/UX Designer</h2>
              <p>
                I create beautiful, responsive web applications that provide 
                exceptional user experiences. Passionate about clean code, 
                modern design, and solving complex problems.
              </p>
              <div className="hero-buttons">
                <Link to="/projects" className="btn">
                  View My Work
                </Link>
                <Link to="/contact" className="btn btn-outline">
                  Get In Touch
                </Link>
              </div>
              <div className="social-links">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="mailto:john@example.com">
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </div>
            <div className="hero-image">
              <div className="image-placeholder">
                <i className="fas fa-user-circle"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-arrow">
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
      </section>

      <section className="quick-intro section">
        <div className="container">
          <div className="intro-grid">
            <div className="intro-card fade-in">
              <div className="card-icon">
                <i className="fas fa-code"></i>
              </div>
              <h3>Clean Code</h3>
              <p>Writing maintainable, scalable, and efficient code following best practices.</p>
            </div>
            <div className="intro-card fade-in">
              <div className="card-icon">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <h3>Responsive Design</h3>
              <p>Creating websites that look great and function perfectly on all devices.</p>
            </div>
            <div className="intro-card fade-in">
              <div className="card-icon">
                <i className="fas fa-rocket"></i>
              </div>
              <h3>Performance</h3>
              <p>Optimizing applications for speed, accessibility, and user experience.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;