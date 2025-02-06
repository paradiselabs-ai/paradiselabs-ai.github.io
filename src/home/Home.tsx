import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { WhyChooseGlue } from './components/Why choose Glue Section/WhyChooseGlue';
import { HowDoesGlueWork } from './components/How does Glue work Section/HowDoesGlueWork';
import { GlueKeyFeatures } from './components/Key features section/GlueKeyFeatures';

const Home: React.FC = () => {

  const firstContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center', // Centers horizontally
    alignItems: 'center',     // Centers vertically
    height: '100vh'           // Full viewport height
  };

  const newContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center', // Centers horizontally
    alignItems: 'center',     // Centers vertically
    height: '100vh',          // Full viewport height
    marginTop: '10%',           // Proper camelCase property name
    marginBottom: '12%'  
  };

  return (
    <div className="home-container">
      {/* ------------- Header Section ------------- */}
      <header className="header-section">
        <div className="gradient-bg">
          <svg xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -7"
                  result="goo"
                />
                <feBlend in="SourceGraphic" in2="goo" />
              </filter>
            </defs>
          </svg>
          <div className="gradients-container">
            <div className="g1"></div>
            <div className="g2"></div>
            <div className="g3"></div>
            <div className="g4"></div>
          </div>
        </div>

        <div className="content-container">
          <section className="hero-section">
            <p>From ParadiseLabs</p>
            <span className="header-line">Generative-AI Linking &</span>
            <span className="header-line">Unification Engine</span>
            <span className="tagline">The GLUE framework</span>
            <span className="glue-line">simplifies complex AI development</span>
            <span className="glue-line">by unifying tools, agents, and processes.</span>
            <div className="cta-container">
              <Link to="/undefined" className="cta-primary">
                Start Building Today
              </Link>
              <Link to="https://github.com/paradiselabs-ai/glue-framework" className="cta-secondary">
                View on Github
              </Link>
            </div>
          </section>
        </div>
      </header>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
        <svg
          width="80%"
          height="3"
          viewBox="0 0 100 3"
          preserveAspectRatio="none"
        >
          <line x1="0" y1="1.1" x2="100" y2="1.1" stroke="#d6ddf4" strokeWidth="2.2" />
        </svg>
      </div>

      {/* ------------- Main Content ------------- */}

      {/* Why Choose GLUE Section */}
      <div style={firstContainerStyle}>
        <WhyChooseGlue />
      </div>
      
      {/* How Does Glue Work Section */}
      <div style={newContainerStyle}>
        <HowDoesGlueWork />
      </div>
      
      {/* Key Features Section */}
      <div style={newContainerStyle}>
        <GlueKeyFeatures />
      </div>
      {/* Main Content */}
      <div className="main-content">
        <div className="CLIC">
          <h1>Unlock the value in team focused AI systems.</h1>
          <div className="cards-container">
            <div className="feature-card">
              <div className="gradient-overlay"></div>
              <div className="feature-content">
                <h3 className="feature-title">Control, moderate, and guide your agent's actions</h3>
                <p className="feature-description">Prevent agents from veering off course and ensure reliability with easy-to-add moderation and quality loops. Add human-in-the-loop to steer and approve agent actions.</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="gradient-overlay"></div>
              <div className="feature-content">
                <h3 className="feature-title">Scale with confidence</h3>
                <p className="feature-description">Deploy and manage multiple agents seamlessly across your organization. Monitor performance and adjust settings in real-time for optimal results.</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="gradient-overlay"></div>
              <div className="feature-content">
                <h3 className="feature-title">Customize workflows</h3>
                <p className="feature-description">Design and implement custom agent workflows that match your specific needs. Integrate with existing systems and processes effortlessly.</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="gradient-overlay"></div>
              <div className="feature-content">
                <h3 className="feature-title">Customize workflows</h3>
                <p className="feature-description">Design and implement custom agent workflows that match your specific needs. Integrate with existing systems and processes effortlessly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;