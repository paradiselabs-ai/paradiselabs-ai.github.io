import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      {/* Header Section */}
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

        {/* Hero Content */}
        <div className="content-container">
          <section className="hero-section">
          <h1>Build Self-Organizing AI Teams<br /><span className="sub-line">Scale Effortlessly</span></h1>
            <p className="tagline">
               and more, with
            </p>
            <span className="sub-line">GenAI Linking &</span><span className="sub-line">Unification Engine</span>
              <Link to="/workflow" className="cta-primary">
              Try Visual Builder
              </Link>
              <Link to="https://github.com/paradiselabs-ai/glue-framework" className="cta-secondary">
                View on Github
              </Link>
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

      {/* Main Content */}
      <div className="main-content">
        <div className="CLIC">
          <h1>Unlock the value in team focused AI systems. </h1>
          <div className="content-grid">
          <div className="content-section">
            <h3>Communicate</h3>
            <p>Design fluid communication patterns between AI agents that enable natural dialogue and automated information sharing.</p>
          </div>
          
          <div className="content-section">
            <h3>Limit</h3>
            <p>Implement strategic boundaries and access controls to maintain system integrity and information security.</p>
          </div>
          
          <div className="content-section">
            <h3>Imitate</h3>
            <p>Mirror proven organizational structures and roles to create intuitive, human-like team dynamics.</p>
          </div>
          
          <div className="content-section">
            <h3>Collaborate</h3>
            <p>Build purposeful cross-team workflows that drive collective outcomes through aligned incentives.</p>
          </div>
          
          <div className="intersection-dot" />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Home;