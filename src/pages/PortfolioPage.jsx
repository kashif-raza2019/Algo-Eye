import React from 'react';
import { Link } from 'react-router';
import '../App.css';
import Footer from '../section/Footer';

const PortfolioPage = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [modalType, setModalType] = React.useState(null); // 'contact' or 'cv'
  const [formData, setFormData] = React.useState({ name: '', email: '' });
  const [formError, setFormError] = React.useState('');
  const [formSuccess, setFormSuccess] = React.useState('');

  const handleButtonClick = (type) => {
    setModalType(type);
    setShowModal(true);
    setFormData({ name: '', email: '' });
    setFormError('');
    setFormSuccess('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    // Validate email
    if (!formData.email.trim()) {
      setFormError('Email is required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Please enter a valid email address');
      return;
    }

    // Here you would typically send the data to your backend
    console.log(`${modalType === 'contact' ? 'Contact' : 'CV Request'}:`, formData);

    // Make an API Call
    const endpoint = "https://api.onequeue.in/v1/portfolio/contact-form";
    const payload = {
      type: modalType,
      name: formData.name,
      email: formData.email
    };
    
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setFormSuccess(
          modalType === 'contact'
            ? 'Thank you for reaching out! I will get back to you soon.'
            : 'Your CV request has been received! Please check your email.'
        );
        setFormData({ name: '', email: '' });
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        setFormError('Oops! Seems like our backend is down. Please try again later.');
      });

    // Close modal after 2 seconds

    setTimeout(() => {
      setShowModal(false);
      setFormSuccess('');
    }, 3000);
  };

  const handleCancel = () => {
    setShowModal(false);
    setFormData({ name: '', email: '' });
    setFormError('');
    setFormSuccess('');
  };

  const skills = [
    'JavaScript',
    'Node.js',
    'Workato Integrations',
    'Unqork',
    'REST APIs',
    'MySQL',
    'C++',
    'Postman',
    'MongoDB',
    'React',
    'Automation',
    'Git',
    'Github Actions',
    'Web Development',
    'InsureMo'
  ];

  const experiences = [
    {
      company: 'Aiden AI',
      position: 'Senior Software Engineer',
      duration: 'Dec 2023 - Present',
      description: `Developed orchestration systems integrating Salesforce, Guidewire, Unqork, and SendGrid.
      Built APIM and event-handling layers using Workato
      Engaged in client communication and requirement gathering
      Developed customer portal login and logout flows using Unqork Identity and Okta Single-Sign On.
      Optimized the API and data orchestration layer to improve performance by ~90% by reducing repetitive module-to-module hops, and making
      non-blocking UI calls to be asynchronous.Built Property & Casualty Rate Quote Bind application features for Insurers.
      Integrated payment gateway (TD Bambora), notifications, and batch jobs.`,
      internalPromotions: [
        {
            position: 'Senior Software Engineer',
            duration: 'July 2025 - Present'
        },
        {
            position: 'Software Engineer',
            duration: 'July 2024 - June 2025'
        },
        {
            position: 'Associate Software Engineer',
            duration: 'Dec 2023 - June 2024'
        }
      ]
    },
    {
        company: 'Unqork',
        position: 'Associate Software Engineer',
        duration: 'Feb 2023 - Nov 2023',
        description: 'Developed RQB features in Unqork for insurance workflows.Delivered sprint stories, performed gap analysis. Earned Unqork Certified Professional & Associate Configurator titles',
    }
  ];

  const projects = [
    {
      title: 'One Queue - Appointment Management Service',
      link: 'https://onequeue.in/',
      isEmbedded: false,
      description:
        'Developed a comprehensive appointment management service for businesses, featuring real-time booking, calendar integration, automated reminders, real-time daily tokens to customers for shops and services.',
    },
    {
      title: 'Single Instance Workato Deployment',
      link: 'https://github.com/kashif-raza2019/workato-automated-deployment',
      isEmbedded: false,
      description:
        'Built a deployment automation tool for Workato projects supporting recipe migration, dependency mapping, dry-runs, and rollback.',
    },
    {
      title: 'Algorithm Visualizer',
      link: '/projects/algorithm-visualizer',
      isEmbedded: true,
      description:
        'An interactive web application for visualizing sorting and searching algorithms with real-time comparison and performance analysis.',
    },
    {
      title: 'Unqork-Web NPM Library',
      link: 'https://www.npmjs.com/package/unqork-web',
      description:
        `Developed an open-source NPM library 'unqork-web' to facilitate interaction with Unqork applications and services from external web applications.`,
    },
    {
        title: 'One Queue Links - URL Shortener',
        link: 'https://links.onequeue.in/',
        isEmbedded: false,
        description:
          'Created a URL shortening service with analytics tracking, and QR code generation for easy sharing.',
    },
    {
        title: 'JSON Tools',
        link: '/projects/json-tools',
        isEmbedded: true,
        description:
          'An interactive web application for visualizing JSON data structures with formatting, validation, and transformation capabilities.',
    }
  ];

  return (
    <div className="portfolio-page">
      <header className="portfolio-header">
        <h1>Kashif Raza</h1>
        <p>Senior Software Engineer | Web & Automation Solutions</p>
      </header>

      <section className="portfolio-section">
        <h2>About Me</h2>
        <p>
          I am a senior software engineer with expertise in web development,
          solution design, and architecture using JavaScript, React, Node.js,
          Workato, and Unqork. I have experience building applications and 
          automation solutions for enterprise clients across insurance industry.
        </p>
      </section>

      <section className="portfolio-section cta-section">
        <div className="cta-container">
          <h2>Let's Connect</h2>
          <p>Interested in working together? Feel free to reach out or download my CV.</p>
          <div className="cta-buttons">
            <button
              className="cta-button contact-button"
              onClick={() => handleButtonClick('contact')}
            >
              💬 Contact Me
            </button>
            <button
              className="cta-button cv-button"
              onClick={() => handleButtonClick('cv')}
            >
              📄 Get My CV
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCancel}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modalType === 'contact' ? 'Contact Me' : 'Request CV'}</h3>
              <button className="modal-close" onClick={handleCancel}>
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="name">Name (Optional)</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              {formError && <div className="form-error">{formError}</div>}
              {formSuccess && <div className="form-success">{formSuccess}</div>}

              <div className="modal-actions">
                <button type="submit" className="submit-button">
                  {modalType === 'contact' ? 'Send Message' : 'Request CV'}
                </button>
                <button type="button" className="cancel-button" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <section className="portfolio-section">
        <h2>Experience</h2>
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker" />
              <div className="timeline-content">
                <h3>{exp.position}</h3>
                <p className="company-name">{exp.company}</p>
                <p className="duration">📅 {exp.duration}</p>
                <p className="description">{exp.description}</p>
                {exp.internalPromotions && (
                  <div className="internal-promotions">
                    <p className="promotions-title">📈 Internal Promotions</p>
                    <div className="promotions-timeline">
                      {exp.internalPromotions.map((promo, i) => (
                        <div key={i} className="promotion-item">
                          <div className="promotion-marker" />
                          <div className="promotion-content">
                            <p className="promotion-position">{promo.position}</p>
                            <p className="promotion-duration">📅 {promo.duration}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="portfolio-section">
        <h2>Skills</h2>
        <div className="skills-container">
          {skills.map((skill, index) => (
            <span key={index} className="skill-badge">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="portfolio-section">
        <h2>Projects</h2>
        <div className="projects-container">
          {projects.map((project, index) => (
            <Link
                key={index}
                to={project.link}
                className="project-card"
            >
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              {!project.isEmbedded && (
                <p className="external-link-note">*This project is not embedded here. Click to view.</p>
              )}
            </Link>
          ))}
        </div>
      </section>

      <section className="portfolio-section">
        <h2>Contact</h2>
        <p>
          Email:{' '}
          <a href="mailto:kashif@onequeue.in">
            kashif@onequeue.in
          </a>
        </p>
        <p>
          GitHub:{' '}
          <a
            href="https://github.com/kashif-raza2019"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/kashif-raza2019
          </a>
        </p>
        <p>
          LinkedIn:{' '}
          <a
            href="https://linkedin.com/in/en-kashifraza"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com/in/en-kashifraza
          </a>
        </p>
        <p>
          Instagram:{' '}
          <a
            href="https://instagram.com/kashifrazareal"
            target="_blank"
            rel="noopener noreferrer"
          >
            instagram.com/@kashifrazareal
          </a>
        </p>
      </section>

     <Footer />
    </div>
  );
};

export default PortfolioPage;
