import React from 'react';
import './About.css';

const About = () => {
  const skills = [
    { name: 'JavaScript', level: 95, icon: 'fab fa-js-square' },
    { name: 'React.js', level: 90, icon: 'fab fa-react' },
    { name: 'Node.js', level: 85, icon: 'fab fa-node-js' },
    { name: 'PHP', level: 80, icon: 'fab fa-php' },
    { name: 'HTML/CSS', level: 95, icon: 'fab fa-html5' },
    { name: 'Python', level: 75, icon: 'fab fa-python' },
    { name: 'MongoDB', level: 80, icon: 'fas fa-database' },
    { name: 'Git', level: 90, icon: 'fab fa-git-alt' }
  ];

  const experiences = [
    {
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Solutions',
      period: '2022 - Present',
      description: 'Leading development of enterprise web applications using React, Node.js, and cloud technologies. Mentoring junior developers and implementing best practices.'
    },
    {
      title: 'Frontend Developer',
      company: 'Digital Agency Pro',
      period: '2020 - 2022',
      description: 'Developed responsive websites and web applications for various clients. Specialized in React.js, Vue.js, and modern CSS frameworks.'
    },
    {
      title: 'Junior Web Developer',
      company: 'StartupHub Inc.',
      period: '2019 - 2020',
      description: 'Built and maintained company websites using WordPress, PHP, and JavaScript. Gained experience in full-stack development.'
    }
  ];

  return (
    <div className="about">
      <div className="container">
        <section className="about-hero section">
          <div className="about-content">
            <div className="about-image fade-in">
              <div className="profile-image">
                <i className="fas fa-user-circle"></i>
              </div>
            </div>
            <div className="about-text fade-in">
              <h1>About Me</h1>
              <h2>Passionate Developer & Creative Problem Solver</h2>
              <p>
                I'm a full-stack developer with over 4 years of experience creating 
                digital solutions that make a difference. My journey started with a 
                curiosity about how websites work, and it has evolved into a passion 
                for building user-centric applications that solve real-world problems.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies, 
                contributing to open-source projects, or enjoying outdoor activities. 
                I believe in continuous learning and staying up-to-date with the 
                latest industry trends.
              </p>
              <div className="about-stats">
                <div className="stat">
                  <h3>50+</h3>
                  <p>Projects Completed</p>
                </div>
                <div className="stat">
                  <h3>4+</h3>
                  <p>Years Experience</p>
                </div>
                <div className="stat">
                  <h3>25+</h3>
                  <p>Happy Clients</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="skills-section section">
          <h2 className="section-title fade-in">Skills & Technologies</h2>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-card fade-in">
                <div className="skill-icon">
                  <i className={skill.icon}></i>
                </div>
                <h3>{skill.name}</h3>
                <div className="skill-bar">
                  <div 
                    className="skill-fill" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <span className="skill-percentage">{skill.level}%</span>
              </div>
            ))}
          </div>
        </section>

        <section className="experience-section section">
          <h2 className="section-title fade-in">Work Experience</h2>
          <div className="timeline">
            {experiences.map((exp, index) => (
              <div key={index} className="timeline-item fade-in">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>{exp.title}</h3>
                  <h4>{exp.company}</h4>
                  <span className="period">{exp.period}</span>
                  <p>{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="personal-section section">
          <div className="personal-grid">
            <div className="personal-card fade-in">
              <h3>Education</h3>
              <div className="education-item">
                <h4>Bachelor of Computer Science</h4>
                <p>University of Technology</p>
                <span>2015 - 2019</span>
              </div>
            </div>
            <div className="personal-card fade-in">
              <h3>Interests</h3>
              <div className="interests">
                <span className="interest-tag">Photography</span>
                <span className="interest-tag">Hiking</span>
                <span className="interest-tag">Open Source</span>
                <span className="interest-tag">AI/ML</span>
                <span className="interest-tag">Gaming</span>
                <span className="interest-tag">Music</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;