import React, { useState } from 'react';
import './Projects.css';

const Projects = () => {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, shopping cart, payment integration, and admin dashboard.',
      image: '/api/placeholder/400/250',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      category: 'fullstack',
      demoLink: 'https://demo-ecommerce.com',
      githubLink: 'https://github.com/johndoe/ecommerce',
      featured: true
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative project management tool with real-time updates, drag-and-drop functionality, and team collaboration features.',
      image: '/api/placeholder/400/250',
      technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
      category: 'frontend',
      demoLink: 'https://taskmanager-demo.com',
      githubLink: 'https://github.com/johndoe/taskmanager',
      featured: true
    },
    {
      id: 3,
      title: 'Restaurant Website',
      description: 'A responsive restaurant website with online reservation system, menu display, and contact forms. Built with modern web technologies.',
      image: '/api/placeholder/400/250',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP'],
      category: 'frontend',
      demoLink: 'https://restaurant-demo.com',
      githubLink: 'https://github.com/johndoe/restaurant',
      featured: false
    },
    {
      id: 4,
      title: 'Weather Dashboard',
      description: 'A real-time weather application with location-based forecasts, interactive maps, and detailed weather analytics.',
      image: '/api/placeholder/400/250',
      technologies: ['React', 'Weather API', 'Chart.js'],
      category: 'frontend',
      demoLink: 'https://weather-dashboard.com',
      githubLink: 'https://github.com/johndoe/weather',
      featured: false
    },
    {
      id: 5,
      title: 'API Gateway Service',
      description: 'A microservices API gateway built with Node.js, featuring rate limiting, authentication, and request routing.',
      image: '/api/placeholder/400/250',
      technologies: ['Node.js', 'Redis', 'Docker', 'JWT'],
      category: 'backend',
      demoLink: null,
      githubLink: 'https://github.com/johndoe/api-gateway',
      featured: false
    },
    {
      id: 6,
      title: 'Social Media Dashboard',
      description: 'A comprehensive social media analytics dashboard with data visualization and automated reporting features.',
      image: '/api/placeholder/400/250',
      technologies: ['React', 'D3.js', 'Python', 'FastAPI'],
      category: 'fullstack',
      demoLink: 'https://social-dashboard.com',
      githubLink: 'https://github.com/johndoe/social-dashboard',
      featured: true
    }
  ];

  const categories = [
    { key: 'all', label: 'All Projects' },
    { key: 'fullstack', label: 'Full Stack' },
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <div className="projects">
      <div className="container">
        <section className="projects-hero section">
          <div className="hero-content fade-in">
            <h1>My Projects</h1>
            <p>
              A showcase of my recent work and personal projects. Each project 
              represents a unique challenge and demonstrates different aspects 
              of my development skills.
            </p>
          </div>
        </section>

        <section className="featured-projects section">
          <h2 className="section-title fade-in">Featured Projects</h2>
          <div className="featured-grid">
            {featuredProjects.map((project, index) => (
              <div key={project.id} className="featured-card fade-in">
                <div className="project-image">
                  <div className="image-placeholder">
                    <i className="fas fa-laptop-code"></i>
                  </div>
                  <div className="project-overlay">
                    <div className="project-links">
                      {project.demoLink && (
                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="project-link">
                          <i className="fas fa-external-link-alt"></i>
                        </a>
                      )}
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link">
                        <i className="fab fa-github"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="all-projects section">
          <h2 className="section-title fade-in">All Projects</h2>
          
          <div className="filter-tabs">
            {categories.map(category => (
              <button
                key={category.key}
                className={`filter-tab ${filter === category.key ? 'active' : ''}`}
                onClick={() => setFilter(category.key)}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <div key={project.id} className="project-card fade-in">
                <div className="project-image">
                  <div className="image-placeholder">
                    <i className="fas fa-laptop-code"></i>
                  </div>
                  <div className="project-overlay">
                    <div className="project-links">
                      {project.demoLink && (
                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="project-link">
                          <i className="fas fa-external-link-alt"></i>
                        </a>
                      )}
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link">
                        <i className="fab fa-github"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="project-stats section">
          <div className="stats-grid">
            <div className="stat-card fade-in">
              <div className="stat-icon">
                <i className="fas fa-code"></i>
              </div>
              <h3>50+</h3>
              <p>Projects Completed</p>
            </div>
            <div className="stat-card fade-in">
              <div className="stat-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>25+</h3>
              <p>Happy Clients</p>
            </div>
            <div className="stat-card fade-in">
              <div className="stat-icon">
                <i className="fas fa-coffee"></i>
              </div>
              <h3>1000+</h3>
              <p>Cups of Coffee</p>
            </div>
            <div className="stat-card fade-in">
              <div className="stat-icon">
                <i className="fas fa-clock"></i>
              </div>
              <h3>5000+</h3>
              <p>Hours Coded</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Projects;